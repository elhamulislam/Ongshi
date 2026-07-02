import type { HomeStory } from "@/lib/fallbacks/home";

export type ProgramImpactStat = {
  _id?: string;
  value: string;
  label: string;
};

export type ProgramGalleryImage = {
  imageUrl: string;
  imageAlt: string;
};

export type ProgramData = {
  _id: string;
  title: string;
  slug: string;
  pillar: string;
  summary: string;
  heroImageUrl: string;
  heroImageAlt: string;
  theNeed?: unknown[] | null;
  whatWeDo?: unknown[] | null;
  sponsorable?: boolean | null;
  suggestedGift?: string | null;
  whatGiftFunds?: string | null;
  donateUrlOverride?: string | null;
  impactStats: ProgramImpactStat[];
  gallery: ProgramGalleryImage[];
  relatedStories: HomeStory[];
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};

export type ProgramCard = {
  _id: string;
  title: string;
  slug: string;
  pillar: string;
  summary: string;
  sponsorable?: boolean | null;
  suggestedGift?: string | null;
  donateUrlOverride?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export const PILLAR_LABELS: Record<string, string> = {
  "health-care": "Health care",
  "relief-rehab": "Relief & rehab",
  education: "Education",
};

export const fallbackPrograms: ProgramCard[] = [
  {
    _id: "program-sponsor-an-eye",
    title: "Restore someone's sight",
    slug: "sponsor-an-eye",
    pillar: "health-care",
    summary:
      "A simple cataract surgery brings a person's world back into focus. Your gift funds the operation, the camp, and the follow-up care.",
    sponsorable: true,
    imageUrl: "/images/eye-camp.jpg",
    imageAlt: "A clinician examines a patient's eyes at an Ongshi eye camp",
  },
  {
    _id: "program-cervical-cancer",
    title: "Cervical cancer elimination",
    slug: "cervical-cancer-elimination",
    pillar: "health-care",
    summary:
      "Screening, treatment, and education to eliminate cervical cancer in the communities we serve.",
    sponsorable: true,
    imageUrl: "/images/eye-camp.jpg",
    imageAlt: "Health care outreach in Bangladesh",
  },
  {
    _id: "program-sponsor-a-village",
    title: "Rebuild after the flood",
    slug: "sponsor-a-village",
    pillar: "relief-rehab",
    summary:
      "When the water takes everything, we help families rebuild their homes and their footing — board by board, roof by roof.",
    sponsorable: true,
    imageUrl: "/images/rebuild-roof.jpg",
    imageAlt: "A man fits a new metal roof onto a home being rebuilt after flooding",
  },
  {
    _id: "program-flood-relief",
    title: "Flood relief",
    slug: "flood-relief",
    pillar: "relief-rehab",
    summary:
      "Emergency food, shelter, and supplies when floods displace families across Bangladesh.",
    sponsorable: true,
    imageUrl: "/images/rebuild-frame.jpg",
    imageAlt: "A home being rebuilt on a bamboo frame after flooding in Bangladesh",
  },
  {
    _id: "program-sponsor-a-child",
    title: "Raise a child",
    slug: "sponsor-a-child",
    pillar: "education",
    summary:
      "A monthly gift puts food on the table, clothes on their back, and a child in school — with updates on how they're growing.",
    sponsorable: true,
    suggestedGift: "$30 / month",
    imageUrl: "/images/youth-volunteers.jpg",
    imageAlt: "Ongshi youth volunteers in Austin, Texas",
  },
];

const fallbackProgramDetails: Record<string, Omit<ProgramData, "_id" | "slug">> = {
  "sponsor-an-eye": {
    title: "Restore someone's sight",
    pillar: "health-care",
    summary:
      "A simple cataract surgery brings a person's world back into focus. Your gift funds the operation, the camp, and the follow-up care.",
    heroImageUrl: "/images/eye-camp.jpg",
    heroImageAlt: "A clinician examines a patient's eyes at an Ongshi eye camp",
    theNeed: null,
    whatWeDo: null,
    sponsorable: true,
    suggestedGift: null,
    whatGiftFunds:
      "One gift covers screening, surgery, post-operative care, and glasses when needed.",
    donateUrlOverride: null,
    impactStats: [
      { value: "156", label: "cataract surgeries funded in 2025" },
      { value: "1,500+", label: "patients screened at eye camps" },
    ],
    gallery: [
      {
        imageUrl: "/images/eye-camp.jpg",
        imageAlt: "A clinician examines a patient's eyes at an Ongshi eye camp",
      },
      {
        imageUrl: "/images/hero-glasses.jpg",
        imageAlt: "An Ongshi volunteer fits glasses for an elderly man at an eye camp",
      },
    ],
    relatedStories: [],
  },
  "sponsor-a-village": {
    title: "Rebuild after the flood",
    pillar: "relief-rehab",
    summary:
      "When the water takes everything, we help families rebuild their homes and their footing — board by board, roof by roof.",
    heroImageUrl: "/images/rebuild-roof.jpg",
    heroImageAlt: "A man fits a new metal roof onto a home being rebuilt after flooding",
    theNeed: null,
    whatWeDo: null,
    sponsorable: true,
    suggestedGift: null,
    whatGiftFunds:
      "Your sponsorship helps purchase materials, hire local labor, and restore a family's home.",
    donateUrlOverride: null,
    impactStats: [
      { value: "20+", label: "homes rebuilt after the floods" },
    ],
    gallery: [
      {
        imageUrl: "/images/rebuild-roof.jpg",
        imageAlt: "A man fits a new metal roof onto a home being rebuilt after flooding",
      },
      {
        imageUrl: "/images/rebuild-frame.jpg",
        imageAlt: "A home being rebuilt on a bamboo frame after flooding in Bangladesh",
      },
    ],
    relatedStories: [],
  },
  "sponsor-a-child": {
    title: "Raise a child",
    pillar: "education",
    summary:
      "A monthly gift puts food on the table, clothes on their back, and a child in school — with updates on how they're growing.",
    heroImageUrl: "/images/youth-volunteers.jpg",
    heroImageAlt: "Ongshi youth volunteers in Austin, Texas",
    theNeed: null,
    whatWeDo: null,
    sponsorable: true,
    suggestedGift: "$30 / month",
    whatGiftFunds:
      "Monthly support covers food, clothing, school fees, and supplies — with updates on your sponsored child.",
    donateUrlOverride: null,
    impactStats: [
      { value: "$30", label: "sponsors a child for a month" },
    ],
    gallery: [
      {
        imageUrl: "/images/youth-volunteers.jpg",
        imageAlt: "Ongshi youth volunteers in Austin, Texas",
      },
    ],
    relatedStories: [],
  },
};

export function getFallbackProgram(slug: string): ProgramData | null {
  const card = fallbackPrograms.find((p) => p.slug === slug);
  const details = fallbackProgramDetails[slug];
  if (!card || !details) {
    return null;
  }

  return {
    _id: card._id,
    slug: card.slug,
    ...details,
    relatedStories: details.relatedStories,
  };
}
