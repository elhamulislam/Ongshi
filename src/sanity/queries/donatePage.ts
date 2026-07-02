import { defineQuery } from "next-sanity";

export const DONATE_PAGE_QUERY = defineQuery(`
  *[_type == "donatePage" && _id == "donatePage"][0]{
    headline,
    whyGive,
    whereYourMoneyGoes,
    "featuredStats": featuredStats[]->{
      value,
      label
    },
    seo
  }
`);
