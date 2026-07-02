import { defineArrayMember, defineField, defineType } from "sanity";

export const donatePage = defineType({
  name: "donatePage",
  title: "Donate page",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyGive",
      title: "Why give",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whereYourMoneyGoes",
      title: "Where your money goes",
      type: "text",
      rows: 3,
      description: "Short reassurance copy above the impact numbers",
    }),
    defineField({
      name: "featuredStats",
      title: "Impact stats",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "impactStat" }] })],
      description: "Shown in the “where your money goes” section",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Donate page" };
    },
  },
});
