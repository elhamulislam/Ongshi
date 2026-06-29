import { defineField, defineType } from "sanity";

export const newsletter = defineType({
  name: "newsletter",
  title: "Newsletter",
  type: "object",
  fields: [
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      description: "e.g. Mailchimp, Buttondown",
    }),
    defineField({
      name: "signupUrl",
      title: "Signup URL",
      type: "url",
    }),
    defineField({
      name: "embedCode",
      title: "Embed code",
      type: "text",
      rows: 4,
    }),
  ],
});
