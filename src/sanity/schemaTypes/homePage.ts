import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      type: "array",
      of: [defineArrayMember({ type: "heroSlide" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero subtext",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Hero primary CTA",
      type: "cta",
      description: "Defaults to donation config when URL is blank",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero secondary CTA",
      type: "cta",
    }),
    defineField({
      name: "featuredPrograms",
      title: "Featured programs",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "program" }] })],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "sponsorshipHook",
      title: "Sponsorship hook",
      type: "sponsorshipHook",
    }),
    defineField({
      name: "featuredStats",
      title: "Featured impact stats",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "impactStat" }] })],
      description: "Leave empty to auto-pull stats marked show on home",
    }),
    defineField({
      name: "featuredStories",
      title: "Featured stories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "story" }] })],
      description: "Leave empty to auto-pull stories marked featured on home",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
