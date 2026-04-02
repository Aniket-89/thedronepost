import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "showBreakingTicker",
      title: "Show Breaking Ticker",
      type: "boolean",
      initialValue: false,
      description: "Toggle the scrolling headline ticker below the navbar",
    }),
    defineField({
      name: "breakingHeadlines",
      title: "Breaking Headlines",
      type: "array",
      of: [{ type: "string" }],
      description: "Headlines that scroll in the ticker bar",
    }),
    defineField({
      name: "subscriberCount",
      title: "Subscriber Count",
      type: "number",
      description: "Displayed on the newsletter signup section",
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
