import type { PortableTextBlock } from "@portabletext/types";

export type StoryCard = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  tags?: string[] | null;
  excerpt?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export type StoryAboutLink = {
  _type: "program" | "campaign";
  title: string;
  slug: string;
};

export type StoryData = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  tags?: string[] | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  body: PortableTextBlock[];
  about?: StoryAboutLink | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};
