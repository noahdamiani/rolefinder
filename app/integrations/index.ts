import { Indeed } from "@app/integrations/indeed";
import { LinkedIn } from "@app/integrations/linkedin";
import { ZipRecruiter } from "./ziprecruiter";
import { Browser } from "puppeteer";
import { Integration, Params } from "@app/config.types";
import { Collector } from "@app/tools/collect";

export interface JobDescription {
  role: string;
  company: string;
  pay: string;
  type: string;
  location: string;
  description: string;
  url: string;
  source: Integration;
}

export type Service = (params: Params) => Collector;

export const Integrations: Record<Integration, Service> = {
  [Integration.Indeed]: Indeed,
  [Integration.LinkedIn]: LinkedIn,
  [Integration.ZipRecruiter]: ZipRecruiter,
};
