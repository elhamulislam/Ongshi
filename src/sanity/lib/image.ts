import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";

export function urlFor(source: SanityImageSource) {
  if (!client) {
    return null;
  }
  return imageUrlBuilder(client).image(source);
}
