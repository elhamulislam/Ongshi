import { defineArrayMember, defineField, defineType } from "sanity";

export const campaign = defineType({
  name: "campaign",
  title: "Campaign / Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Eye/medical camp", value: "eye-medical-camp" },
          { title: "Fundraiser", value: "fundraiser" },
          { title: "Relief response", value: "relief-response" },
          { title: "Youth project", value: "youth-project" },
          { title: "Community event", value: "community-event" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "youthLed",
      title: "Youth-led",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Ongoing", value: "ongoing" },
          { title: "Completed", value: "completed" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "blockContent",
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "text",
      rows: 3,
      description: 'Transparency receipt, e.g. "collected 500 pairs of shoes"',
    }),
    defineField({
      name: "ctaType",
      title: "CTA type",
      type: "string",
      options: {
        list: [
          { title: "Register", value: "register" },
          { title: "Donate", value: "donate" },
          { title: "Volunteer", value: "volunteer" },
          { title: "None", value: "none" },
        ],
      },
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "url",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "supportsProgram",
      title: "Supports program",
      type: "reference",
      to: [{ type: "program" }],
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "partner" }] })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "heroImage",
    },
  },
});
