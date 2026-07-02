import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

// Studio-only public env — no server tokens. Editing auth is via Sanity login (cookies).
import { apiVersion, dataset, projectId } from "./src/sanity/studioEnv";
import { schema } from "./src/sanity/schemaTypes";
import { structure, singletonTypes } from "./src/sanity/structure";

export default defineConfig({
  name: "ongshi",
  title: "Ongshi",
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  basePath: "/studio",
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => action !== "delete" && action !== "duplicate");
      }
      return prev;
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !singletonTypes.has(template.templateId));
      }
      return prev;
    },
  },
});
