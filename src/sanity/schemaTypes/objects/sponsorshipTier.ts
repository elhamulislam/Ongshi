import { defineField, defineType } from "sanity";

export const sponsorshipTier = defineType({
  name: "sponsorshipTier",
  title: "Sponsorship tier",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      options: {
        list: [
          { title: "Eye", value: "eye" },
          { title: "Child", value: "child" },
          { title: "Village", value: "village" },
          { title: "Cervical cancer", value: "cervical-cancer" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "string",
      description: 'e.g. "$30 / month"',
    }),
    defineField({
      name: "whatItFunds",
      title: "What it funds",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "url",
      title: "Donation URL",
      type: "url",
      description: "Zeffy link for this sponsorship tier",
    }),
  ],
});
