import { defineQuery } from "next-sanity";

export const YOUTH_PAGE_QUERY = defineQuery(`
  *[_type == "youthPage" && _id == "youthPage"][0]{
    headline,
    intro,
    whyJoin,
    joinHeadline,
    joinText,
    seo
  }
`);
