import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
      description: "Who Ongshi is",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mission",
      title: "Mission",
      type: "text",
      rows: 4,
      description: "Optional mission paragraph below the intro",
    }),
    defineField({
      name: "impactStats",
      title: "Impact stats",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "impactStat" }] })],
      description: "Shown in the impact strip below the intro",
    }),
    defineField({
      name: "transparencyStatement",
      title: "Transparency statement",
      type: "text",
      rows: 4,
      description: "Short reassurance copy below the impact numbers",
    }),
    defineField({
      name: "annualReports",
      title: "Annual reports",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "annualReport",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        }),
      ],
      description: "Optional links to annual reports or financial summaries",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
