import { defineField, defineType } from "sanity";

export const impactStat = defineType({
  name: "impactStat",
  title: "Impact stat",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'Include symbols as needed, e.g. "156", "15+", "$30"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedProgram",
      title: "Related program",
      type: "reference",
      to: [{ type: "program" }],
    }),
    defineField({
      name: "showOnHome",
      title: "Show on home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "value",
      subtitle: "label",
    },
  },
});
