import { logger } from "@app/tools/logging";
import { Integrations } from "@app/integrations";
import { Integration } from "@app/config.types";
import { toDollarValue } from "@app/common/currency";
import { Parser } from "json2csv";
import config from "@app/config";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import puppeteer from "puppeteer-extra";
import stealth from "puppeteer-extra-plugin-stealth";
import { dir } from "console";

puppeteer.use(stealth());
process.setMaxListeners(Infinity);

const { integrations, output, ...params } = config;
const welcome = `
---- Unpacking Config ----
Searching ${integrations.join(", ")}:

${params.keywords.join("\n")}

Target pay: ${toDollarValue(params.pay)}
---------------------------`;

logger.info(welcome);

const createDirectories = (...dirs: string[]) => {
  for (const dir of dirs) {
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
  }
};

async function main() {
  const results: Record<string, string>[][] = [];

  createDirectories("./reports", "./reports/snapshots");

  for (const integration of integrations) {
    if (!(integration in Integrations)) {
      const validOptions = Object.keys(Integration).join(", ");
      throw `Provided type: ${integration} is not a valid integration. Valid: ${validOptions}`;
    }
    const service = Integrations[integration];
    const collector = service(params);
    const items = await collector.gather();
    results.push(items);
  }
  return results.flat();
}

main()
  .then((out) => {
    logger.info("\n\n\n*** Success ***");
    logger.info("-----------------------------------------");
    logger.info("-----------------------------------------");
    logger.info("-----------------------------------------");
    logger.info(`Found ${out.length} results...`);

    if (output.formats.json) {
      writeFileSync(
        `./reports/${output.name}.json`,
        JSON.stringify(out, undefined, 4),
        "utf-8"
      );
      logger.info(`Report generated at: ${output.name}.json `);
    }

    if (output.formats.csv && Object.keys(out[0]).length > 0) {
      writeFileSync(
        `./reports/${output.name}.csv`,
        new Parser({
          fields: Object.keys(out[0]),
        }).parse(out),
        "utf-8"
      );
      logger.info(`Report generated at: ${output.name}.csv`);
    }

    logger.info("-----------------------------------------");
    logger.info("-----------------------------------------");
    logger.info("-----------------------------------------");

    process.exit(0);
  })
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
