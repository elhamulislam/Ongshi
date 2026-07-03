import type { PortableTextBlock } from "@portabletext/types";

export type EventGalleryImage = {
  imageUrl: string;
  imageAlt: string;
};

export type EventData = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  status?: string | null;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  details?: PortableTextBlock[] | null;
  outcome?: string | null;
  ctaType?: string | null;
  ctaUrl?: string | null;
  supportsProgramSlug?: string | null;
  gallery?: EventGalleryImage[];
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};

export type EventCard = {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  status?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export type EventsIndexData = {
  upcoming: EventCard[];
  past: EventCard[];
};
