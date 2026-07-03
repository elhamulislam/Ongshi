import { defineQuery } from "next-sanity";

export const GET_INVOLVED_PAGE_QUERY = defineQuery(`
  *[_type == "getInvolvedPage" && _id == "getInvolvedPage"][0]{
    headline,
    intro,
    detail,
    volunteerHeadline,
    volunteerText,
    volunteerFormUrl,
    newsletterHeadline,
    newsletterText,
    seo
  }
`);
