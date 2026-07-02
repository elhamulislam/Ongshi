import { defineField, defineType } from "sanity";

export const donation = defineType({
  name: "donation",
  title: "Donation config",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [{ title: "Zeffy", value: "zeffy" }],
      },
      initialValue: "zeffy",
      readOnly: true,
    }),
    defineField({
      name: "primaryUrl",
      title: "General donation URL",
      type: "url",
      description: "Zeffy link for the base / general campaign",
    }),
    defineField({
      name: "sponsorshipTiers",
      title: "Sponsorship tiers",
      type: "array",
      of: [{ type: "sponsorshipTier" }],
    }),
  ],
});
