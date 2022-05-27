import { Config, Integration } from "@app/config.types";

const config: Config = {
  integrations: [
    Integration.Indeed,
    Integration.LinkedIn,
    Integration.ZipRecruiter,
  ],
  keywords: ["Lead UI Engineer", "Staff UI Engineer", "Engineering Manager"],
  locations: ["remote", "Chicago"],
  pay: 200000,
  output: {
    name: "dump",
    formats: {
      csv: true,
      json: true,
    },
  },
};

export default config;
