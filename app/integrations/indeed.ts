import { Integration } from "@app/config.types";
import { Collector } from "@app/tools/collect";
import { createQueries } from "@app/tools/queries";
import { Service } from "@app/integrations";
import { toDollarValue } from "@app/common/currency";

export const Indeed: Service = (params) =>
  Collector({
    queries: createQueries(params).map(
      ({ keyword, location }) =>
        "/jobs?" +
        new URLSearchParams({
          q: `${keyword} ${toDollarValue(params.pay)}`,
          l: location,
        })
    ),
    baseUrl: "https://www.indeed.com",
    source: Integration.Indeed,
    selectors: {
      cards: ".jobsearch-ResultsList > li",
      role: ".jcs-JobTitle span",
      salary: ".salary-snippet-container .attribute_snippet",
      description: ".underShelfFooter .job-snippet:nth-child(1)",
      url: ".jcs-JobTitle",
      company: ".companyName",
      jobType: ".salaryOnly .metadata:nth-child(3) .attribute_snippet",
      location: ".companyLocation",
    },
  });
