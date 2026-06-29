import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    heroSlides[]{
      statValue,
      statLabel,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    },
    heroHeadline,
    heroSubtext,
    heroPrimaryCta,
    heroSecondaryCta,
    sponsorshipHook,
    "featuredPrograms": featuredPrograms[]->{
      _id,
      title,
      "slug": slug.current,
      summary,
      suggestedGift,
      sponsorable,
      pillar,
      donateUrlOverride,
      "imageUrl": heroImage.asset->url,
      "imageAlt": heroImage.alt
    },
    "featuredStats": coalesce(
      featuredStats[]->{
        value,
        label
      },
      *[_type == "impactStat" && showOnHome == true] | order(order asc)[0...4]{
        value,
        label
      }
    ),
    "featuredStories": coalesce(
      featuredStories[]->{
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        tags,
        "excerpt": pt::text(body),
        "imageUrl": coverImage.asset->url,
        "imageAlt": coverImage.alt
      },
      *[_type == "story" && featuredOnHome == true] | order(publishedAt desc)[0...3]{
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        tags,
        "excerpt": pt::text(body),
        "imageUrl": coverImage.asset->url,
        "imageAlt": coverImage.alt
      }
    ),
    seo
  }
`);

export const HOME_PARTNERS_QUERY = defineQuery(`
  *[_type == "partner"] | order(order asc){
    _id,
    name,
    website,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt
  }
`);
