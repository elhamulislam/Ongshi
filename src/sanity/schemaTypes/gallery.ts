import { defineArrayMember, defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: "Shown as the page headline",
      initialValue: "Gallery",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "Optional short line below the headline",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [defineArrayMember({ type: "galleryImage" })],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Gallery" };
    },
  },
});
