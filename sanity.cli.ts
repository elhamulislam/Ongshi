import { defineCliConfig } from "sanity/cli";

import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME,
  autoUpdates: true,
  deployment: {
    appId: "ongshi-web",
  },
  vite: (config) => config,
});
