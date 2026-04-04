"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "thedronepost",
  title: "The Drone Post",
  projectId,
  dataset,
  basePath: "/studio",
  deployment: {
    appId: 'g2rccx8qanhjoatra0s9i2ya',
    autoUpdates: true
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Site Settings as a singleton
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            // Regular document lists
            S.documentTypeListItem("article").title("Articles"),
            S.documentTypeListItem("author").title("Authors"),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-03-01" }),
  ],
  schema: { types: schemaTypes },
});
