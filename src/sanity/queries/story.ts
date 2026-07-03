import { defineQuery } from "next-sanity";

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

export const STORIES_INDEX_QUERY = defineQuery(`
  *[_type == "story" && (!$tag || $tag in tags)] | order(publishedAt desc){
    ${storyCardFields}
  }
`);

export const STORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "story" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    tags,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    body,
    "about": about->{
      _type,
      title,
      "slug": slug.current
    },
    seo
  }
`);
