import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    orgName,
    tagline,
    contactEmail,
    contactPhone,
    address,
    nonprofitLine,
    social,
    newsletter,
    donation
  }
`);
