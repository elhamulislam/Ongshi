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
        list: [
          { title: "Givebutter", value: "givebutter" },
          { title: "Zeffy", value: "zeffy" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "givebutter",
    }),
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      options: {
        list: [
          { title: "Embed", value: "embed" },
          { title: "Link", value: "link" },
        ],
      },
      initialValue: "link",
    }),
    defineField({
      name: "primaryUrl",
      title: "Primary donation URL",
      type: "url",
      description: "Used when mode is Link",
    }),
    defineField({
      name: "primaryEmbed",
      title: "Primary embed code",
      type: "text",
      rows: 6,
      description: "Used when mode is Embed",
    }),
    defineField({
      name: "sponsorshipTiers",
      title: "Sponsorship tiers",
      type: "array",
      of: [{ type: "sponsorshipTier" }],
    }),
  ],
});
