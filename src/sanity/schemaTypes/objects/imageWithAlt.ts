import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Optional. Falls back to a generic label on the site when empty.",
    }),
  ],
});
