import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "statValue",
      title: "Stat value",
      type: "string",
      description: 'e.g. "156", "40+", "$30"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "statLabel",
      title: "Stat label",
      type: "string",
      description: "Short label shown on the synced stat card",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "statValue",
      subtitle: "statLabel",
      media: "image",
    },
  },
});
