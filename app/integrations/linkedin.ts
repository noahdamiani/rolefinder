import { Integration } from "@app/config.types";
import { Collector } from "@app/tools/collect";
import { createQueries } from "@app/tools/queries";
import { Service } from "@app/integrations";

type Buckets = {
  get: (this: Buckets, salary: number) => string;
  map: Record<number, number>;
};

/**
 *
 * LinkedIn uses a bucketing system for salary bands.
 * This method takes the configured pay and determines
 * if it falls within the band's range.
 *
 */
const salaryBuckets: Buckets = {
  get(salary) {
    const entries = Object.entries({ ...this.map });

    while (entries.length) {
      const [current, currentBand] = entries.pop();
      const [next] = entries[entries.length - 1];

      if (salary <= parseInt(current) && salary >= parseInt(next)) {
        return currentBand.toString();
      }
    }

    return Object.values({ ...this.map })
      .pop()
      .toString();
  },
  map: {
    40000: 1,
    60000: 2,
    80000: 3,
    10000: 4,
    120000: 5,
    160000: 6,
    180000: 7,
    200000: 8,
  },
};

export const LinkedIn: Service = (params) =>
  Collector({
    queries: createQueries(params).map(
      ({ keyword, location }) =>
        "/jobs/search/?" +
        new URLSearchParams({
          keywords: keyword,
          ...(location.toUpperCase() !== "REMOTE"
            ? {
                location,
              }
            : {}),
          f_SB2: salaryBuckets.get(params.pay),
          f_WT: "1",
        })
    ),
    baseUrl: "https://www.linkedin.com",
    source: Integration.LinkedIn,
    selectors: {
      cards: ".base-search-card__info",
      role: ".base-search-card__title",
      salary: ".job-search-card__salary-info",
      description: "",
      url: ".base-card__full-link",
      company: ".base-search-card__subtitle a",
      jobType: "",
      location: ".job-search-card__location",
    },
  });
