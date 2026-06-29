import { defineField, defineType } from "sanity";

export const sponsorshipHook = defineType({
  name: "sponsorshipHook",
  title: "Sponsorship hook",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
    }),
  ],
});
