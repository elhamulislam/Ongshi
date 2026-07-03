import { defineField, defineType } from "sanity";

export const getInvolvedPage = defineType({
  name: "getInvolvedPage",
  title: "Get Involved page",
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
      description: "Overview of the ways to support Ongshi",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "text",
      rows: 3,
      description: "Optional second paragraph below the intro",
    }),
    defineField({
      name: "volunteerHeadline",
      title: "Volunteer headline",
      type: "string",
      description: 'e.g. "Volunteer with us"',
    }),
    defineField({
      name: "volunteerText",
      title: "Volunteer text",
      type: "text",
      rows: 2,
      description: "One or two lines below the volunteer headline",
    }),
    defineField({
      name: "newsletterHeadline",
      title: "Newsletter headline",
      type: "string",
      description: 'e.g. "Stay close to the work"',
    }),
    defineField({
      name: "newsletterText",
      title: "Newsletter text",
      type: "text",
      rows: 2,
      description: "One line below the newsletter headline",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Get Involved page" };
    },
  },
});
