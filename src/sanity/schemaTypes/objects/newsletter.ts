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
      description: "e.g. Zeffy, Mailchimp, Buttondown",
    }),
    defineField({
      name: "signupUrl",
      title: "Signup URL",
      type: "url",
      description: "Optional direct link to the signup page (not used on the site)",
    }),
    defineField({
      name: "newsletterEmbed",
      title: "Newsletter embed",
      type: "text",
      rows: 6,
      description:
        "Zeffy iframe embed code for the newsletter signup form (home page and Get Involved)",
    }),
  ],
});
