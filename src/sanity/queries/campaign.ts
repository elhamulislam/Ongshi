import { defineQuery } from "next-sanity";

const eventCardFields = `
  _id,
  title,
  "slug": slug.current,
  startDate,
  endDate,
  location,
  status,
  "imageUrl": heroImage.asset->url,
  "imageAlt": heroImage.alt
`;

export const EVENTS_UPCOMING_QUERY = defineQuery(`
  *[_type == "campaign" && status in ["upcoming", "ongoing"]] | order(startDate asc){
    ${eventCardFields}
  }
`);

export const EVENTS_PAST_QUERY = defineQuery(`
  *[_type == "campaign" && status == "completed"] | order(startDate desc){
    ${eventCardFields}
  }
`);

export const CAMPAIGN_BY_SLUG_QUERY = defineQuery(`
  *[_type == "campaign" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    summary,
    startDate,
    endDate,
    location,
    status,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    details,
    outcome,
    ctaType,
    ctaUrl,
    "supportsProgramSlug": supportsProgram->slug.current,
    "gallery": gallery[]{
      "imageUrl": asset->url,
      "imageAlt": alt
    },
    seo
  }
`);
