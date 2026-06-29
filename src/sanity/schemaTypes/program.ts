import { defineArrayMember, defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pillar",
      title: "Pillar",
      type: "string",
      options: {
        list: [
          { title: "Health care", value: "health-care" },
          { title: "Relief & rehab", value: "relief-rehab" },
          { title: "Education", value: "education" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "theNeed",
      title: "The need",
      type: "blockContent",
    }),
    defineField({
      name: "whatWeDo",
      title: "What we do",
      type: "blockContent",
    }),
    defineField({
      name: "sponsorable",
      title: "Sponsorable",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "suggestedGift",
      title: "Suggested gift",
      type: "string",
      description: 'e.g. "$30 / month"',
      hidden: ({ document }) => !document?.sponsorable,
    }),
    defineField({
      name: "whatGiftFunds",
      title: "What your gift funds",
      type: "text",
      rows: 3,
      hidden: ({ document }) => !document?.sponsorable,
    }),
    defineField({
      name: "donateUrlOverride",
      title: "Donate URL override",
      type: "url",
      description: "Leave blank to use the global donation config",
    }),
    defineField({
      name: "impactStats",
      title: "Impact stats",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "impactStat" }] })],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "relatedStories",
      title: "Related stories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "story" }] })],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Paused", value: "paused" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "featuredOnHome",
      title: "Featured on home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "Bangladesh", value: "bangladesh" },
          { title: "Texas", value: "texas" },
          { title: "Both", value: "both" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
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
      title: "title",
      subtitle: "pillar",
      media: "heroImage",
    },
  },
});
