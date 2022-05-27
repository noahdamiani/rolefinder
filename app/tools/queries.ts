import { Params } from "@app/config.types";

export function createQueries({ keywords, pay, locations }: Params) {
  const queries = [];
  for (const keyword of keywords) {
    for (const location of locations) {
      queries.push({
        keyword,
        location,
        pay,
      });
    }
  }

  return queries;
}
