import { defineQuery } from "next-sanity";

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    headline,
    intro,
    mission,
    "impactStats": impactStats[]->{
      value,
      label
    },
    transparencyStatement,
    annualReports[]{
      label,
      url
    },
    seo
  }
`);
