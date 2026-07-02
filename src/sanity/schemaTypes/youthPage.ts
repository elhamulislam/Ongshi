import { defineField, defineType } from "sanity";

export const youthPage = defineType({
  name: "youthPage",
  title: "Ongshi Youth page",
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
      description: "What Ongshi Youth is and why students join",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyJoin",
      title: "Why students join",
      type: "text",
      rows: 3,
      description: "Optional second paragraph below the intro",
    }),
    defineField({
      name: "joinHeadline",
      title: "Join CTA headline",
      type: "string",
      description: 'e.g. "Join Ongshi Youth"',
    }),
    defineField({
      name: "joinText",
      title: "Join CTA text",
      type: "text",
      rows: 2,
      description: "One line below the join headline",
    }),
    defineField({
      name: "joinFormUrl",
      title: "Join form URL",
      type: "url",
      description: "Google Form for student sign-up (opens in a new tab)",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ongshi Youth page" };
    },
  },
});
