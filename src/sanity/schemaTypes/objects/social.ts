import { defineField, defineType } from "sanity";

export const social = defineType({
  name: "social",
  title: "Social links",
  type: "object",
  fields: [
    defineField({ name: "facebook", title: "Facebook", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "x", title: "X (Twitter)", type: "url" }),
    defineField({ name: "youtube", title: "YouTube", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
  ],
});
