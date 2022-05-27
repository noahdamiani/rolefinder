import { Integration } from "@app/config.types";
import { Collector } from "@app/tools/collect";
import { createQueries } from "@app/tools/queries";
import { Service } from "@app/integrations";

export const ZipRecruiter: Service = (params) =>
  Collector({
    baseUrl: "https://www.ziprecruiter.com",
    queries: createQueries(params).map(
      ({ keyword, location }) =>
        `/jobs-search?` +
        new URLSearchParams({
          search: keyword,
          location,
          refine_by_salary: params.pay.toString(),
        })
    ),
    source: Integration.ZipRecruiter,
    selectors: {
      cards: ".jobs_list > article",
      role: ".job_item h2.title",
      salary: ".perk_item:nth-child(1) .value",
      description: ".job_snippet",
      url: ".job_link",
      company: ".company_details .company_name",
      jobType: ".perk_item:nth-child(2) .value",
      location: ".company_details .company_location",
    },
  });
