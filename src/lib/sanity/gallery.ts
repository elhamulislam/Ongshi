import type { SanityImageSource } from "@sanity/image-url";

export type GalleryImageData = {
  key: string;
  alt?: string | null;
  caption?: string | null;
  source: SanityImageSource;
  width: number;
  height: number;
};

export type GalleryData = {
  title: string;
  intro?: string | null;
  images: GalleryImageData[];
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};
