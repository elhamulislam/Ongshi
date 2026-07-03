export type AboutPageData = {
  headline: string;
  intro: string;
  mission?: string | null;
  impactStats?: Array<{ value: string; label: string }>;
  transparencyStatement?: string | null;
  annualReports?: Array<{ label: string; url: string }> | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};
