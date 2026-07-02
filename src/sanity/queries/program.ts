import { defineQuery } from "next-sanity";

const programCardFields = `
  _id,
  title,
  "slug": slug.current,
  pillar,
  summary,
  sponsorable,
  suggestedGift,
  donateUrlOverride,
  "imageUrl": heroImage.asset->url,
  "imageAlt": heroImage.alt
`;

const storyCardFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  tags,
  "excerpt": pt::text(body),
  "imageUrl": coverImage.asset->url,
  "imageAlt": coverImage.alt
`;

export const PROGRAM_BY_SLUG_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug && status == "active"][0]{
    _id,
    title,
    "slug": slug.current,
    pillar,
    summary,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    theNeed,
    whatWeDo,
    sponsorable,
    suggestedGift,
    whatGiftFunds,
    donateUrlOverride,
    "impactStats": impactStats[]->{
      _id,
      value,
      label
    },
    "gallery": gallery[]{
      "imageUrl": asset->url,
      "imageAlt": alt
    },
    "relatedStories": coalesce(
      relatedStories[]->{${storyCardFields}},
      *[_type == "story" && about._ref == ^._id] | order(publishedAt desc)[0...6]{${storyCardFields}}
    ),
    seo
  }
`);

export const PROGRAMS_INDEX_QUERY = defineQuery(`
  *[_type == "program" && status == "active"] | order(order asc, title asc){
    ${programCardFields}
  }
`);

export const PROGRAM_SLUGS_QUERY = defineQuery(`
  *[_type == "program" && status == "active" && defined(slug.current)].slug.current
`);
