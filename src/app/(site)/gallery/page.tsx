import type { Metadata } from "next";

import { GalleryView } from "@/components/gallery/GalleryView";
import { getGalleryData } from "@/lib/sanity/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const gallery = await getGalleryData();

  return {
    title: gallery?.seo?.metaTitle ?? gallery?.title ?? "Gallery",
    description:
      gallery?.seo?.metaDescription ??
      gallery?.intro ??
      "Photos from Ongshi's work in Bangladesh and Austin, TX.",
  };
}

export default async function GalleryPage() {
  const gallery = await getGalleryData();

  return (
    <GalleryView
      title={gallery?.title ?? "Gallery"}
      intro={gallery?.intro}
      images={gallery?.images ?? []}
    />
  );
}
