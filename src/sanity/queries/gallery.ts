import { defineQuery } from "next-sanity";

export const GALLERY_QUERY = defineQuery(`
  *[_type == "gallery" && _id == "gallery"][0]{
    title,
    intro,
    images[]{
      _key,
      alt,
      caption,
      asset,
      hotspot,
      crop,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    seo
  }
`);
