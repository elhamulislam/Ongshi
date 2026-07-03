export type GetInvolvedPageData = {
  headline: string;
  intro: string;
  detail?: string | null;
  volunteerHeadline?: string | null;
  volunteerText?: string | null;
  newsletterHeadline?: string | null;
  newsletterText?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};
