import puppeteer from "puppeteer";
import { Integration } from "@app/config.types";
import { cache } from "@app/common/cache";
import { logger } from "@app/tools/logging";
import { evaluate } from "@app/tools/evaluate";
import { isNotNull } from "@app/tools/filters";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export type CollectorOptions = {
  source: Integration;
  selectors: Selectors;
  baseUrl?: string;
  queries: string[];
};

export type Selectors = {
  cards: string;
  role: string;
  company: string;
  salary: string;
  jobType: string;
  location: string;
  description: string;
  url: string;
};

export type Collector = {
  gather: () => Promise<Record<string, string>[]>;
};

export type CollectorFactory = (options: CollectorOptions) => Collector;

export const Collector: CollectorFactory = ({
  selectors,
  source,
  baseUrl = "",
  queries,
}) => ({
  async gather() {
    let results: Record<string, string>[][] = [];

    // Iterate over permutations of provided keywords and locations
    for (const query of queries) {
      logger.info(`${source} -> ${query}`);
      const uri = `${baseUrl}${query}`;

      // Avoiding auth walls requires a new stealth browser instance on each collection
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Open the uri with query and wait on network activity to complete
      await page.goto(uri, {
        timeout: 0,
        waitUntil: "networkidle2",
      });

      // Gather the document's html
      await page.waitForSelector("html");
      const html = await page.$("html");
      const e = await html.evaluate(
        () => document.querySelector("*").outerHTML
      );

      // Write a snapshot per query, for debugging
      // and data sanitization
      const reportDir = `./reports/snapshots/${source}`;

      if (!existsSync(reportDir)) {
        mkdirSync(reportDir);
      }

      writeFileSync(
        `./reports/snapshots/${source}/${new URL(uri).search.replace(
          /[^a-zA-Z ]/g,
          ""
        )}.html`,
        e,
        "utf-8"
      );

      const cards = await page.$$(selectors.cards);
      const requiredFields = ["salary", "company", "source", "role"];

      // For each job card, collect content.
      const collected = await Promise.all(
        cards.map(async (card) => {
          const result: Record<string, string> = { source };

          // Iterate over each selector in the integration's document
          for (const [key, value] of Object.entries(selectors)) {
            let extract = "";
            // Ignore empty selectors and helpers
            if (value === "" || key === "cards") continue;

            // Append baseUrl if scraped url does not contain one
            if (key === "url") {
              extract = await evaluate(card, value, "href");
              extract = extract.includes("http")
                ? extract
                : `${baseUrl}${extract}`;
            } else {
              extract = await evaluate(card, value);
            }

            // Only attach results if data is found
            if (extract !== "") result[key] = extract;
          }

          // Omit empty results
          const allValuesEmpty = Object.keys(result).length === 0;

          // Ensure all required fields are present
          const hasRequiredFields = requiredFields.every((k) => k in result);

          if (!allValuesEmpty && !cache[result.role] && hasRequiredFields) {
            // Naive caching to avoid duplicates, improve this.
            cache[result.role] = result.role;
            return result;
          }

          return null;
        })
      );

      results.push(collected.filter(isNotNull));
    }

    return results.flat();
  },
});
