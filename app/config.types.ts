export enum Integration {
  LinkedIn = "linkedin",
  Indeed = "indeed",
  ZipRecruiter = "ziprecruiter",
}

export interface Params {
  keywords: string[];
  locations: string[];
  pay: number;
}

export interface Config extends Params {
  integrations: Integration[];
  output: {
    name: string;
    formats: {
      json: boolean;
      csv: boolean;
    };
  };
}
