import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Optional. Falls back to the caption, then a generic label on the site.",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption shown in the lightbox",
    }),
  ],
});
