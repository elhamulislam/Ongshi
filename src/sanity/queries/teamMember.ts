import { defineQuery } from "next-sanity";

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt
  }
`);
