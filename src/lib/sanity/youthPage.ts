export type YouthPageData = {
  headline: string;
  intro: string;
  whyJoin?: string | null;
  joinHeadline?: string | null;
  joinText?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};
