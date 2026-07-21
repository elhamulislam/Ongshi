import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "orgName",
      title: "Organization name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "logoSize",
      title: "Logo size",
      type: "number",
      description:
        "Logo height in pixels in the site header. Leave empty to use the default (46). Capped on small screens so the header stays balanced.",
      validation: (rule) => rule.min(24).max(72).integer(),
      initialValue: 46,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "social",
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "newsletter",
    }),
    defineField({
      name: "nonprofitLine",
      title: "Nonprofit footer line",
      type: "string",
      description: "e.g. Ongshi is a registered 501(c)(3) nonprofit.",
    }),
    defineField({
      name: "donation",
      title: "Donation config",
      type: "donation",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
