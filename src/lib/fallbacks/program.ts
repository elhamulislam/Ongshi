import type { HomeStory } from "@/lib/fallbacks/home";
import { headingBlock, textBlock } from "@/lib/portableText/fallbackBlocks";
import type { PortableTextBlock } from "@portabletext/types";

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
  theNeed?: PortableTextBlock[] | null;
  whatWeDo?: PortableTextBlock[] | null;
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
    theNeed: [
      headingBlock("Sight shouldn't be a luxury"),
      textBlock(
        "In rural Bangladesh, cataracts steal independence slowly — until a person can no longer work, travel, or recognize the faces of their grandchildren. Surgery exists, but the cost and distance put it out of reach for families already stretched thin.",
      ),
      textBlock(
        "Without intervention, preventable blindness deepens poverty. Parents stop earning. Grandparents lose their footing. Children take on care instead of school.",
      ),
    ],
    whatWeDo: [
      headingBlock("We restore vision, camp by camp"),
      textBlock(
        "Ongshi funds eye camps where local clinicians screen patients, perform cataract surgeries, and provide glasses and follow-up care — all in the communities where people live.",
      ),
      textBlock(
        "Volunteers coordinate logistics, donors cover the cost of each surgery, and families leave camp seeing clearly again. One gift funds the full path from screening to recovery.",
      ),
    ],
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
    relatedStories: [
      {
        _id: "story-eye-camp-mymensingh",
        title: "Eye camp in Mymensingh restores sight to 156 patients",
        slug: "eye-camp-mymensingh",
        tags: ["health"],
        excerpt:
          "Over three days, volunteers screened hundreds and funded life-changing cataract surgeries.",
        imageUrl: "/images/eye-camp.jpg",
        imageAlt: "Eye camp",
      },
    ],
  },
  "sponsor-a-village": {
    title: "Rebuild after the flood",
    pillar: "relief-rehab",
    summary:
      "When the water takes everything, we help families rebuild their homes and their footing — board by board, roof by roof.",
    heroImageUrl: "/images/rebuild-roof.jpg",
    heroImageAlt: "A man fits a new metal roof onto a home being rebuilt after flooding",
    theNeed: [
      headingBlock("When the water recedes, nothing is left"),
      textBlock(
        "Floods in Bangladesh can erase a family's home in a single night — walls collapsed, belongings washed away, and no savings left to start over.",
      ),
      textBlock(
        "Families sleep under tarps for months. Children miss school. Parents borrow at crushing rates just to buy a few sheets of tin.",
      ),
    ],
    whatWeDo: [
      headingBlock("We rebuild homes, together"),
      textBlock(
        "Ongshi works with local partners to purchase materials, hire skilled labor, and rebuild structurally sound homes — board by board, roof by roof.",
      ),
      textBlock(
        "Village sponsorship pools gifts so entire communities can recover faster. Families move back in with dignity, and children return to school.",
      ),
    ],
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
    relatedStories: [
      {
        _id: "story-rebuilding-homes",
        title: "Rebuilding homes, one roof at a time",
        slug: "rebuilding-homes",
        tags: ["relief"],
        excerpt:
          "After the floods receded, families returned to nothing. Here's how the rebuild is going.",
        imageUrl: "/images/rebuild-roof.jpg",
        imageAlt: "Rebuilding a home",
      },
    ],
  },
  "sponsor-a-child": {
    title: "Raise a child",
    pillar: "education",
    summary:
      "A monthly gift puts food on the table, clothes on their back, and a child in school — with updates on how they're growing.",
    heroImageUrl: "/images/youth-volunteers.jpg",
    heroImageAlt: "Ongshi youth volunteers in Austin, Texas",
    theNeed: [
      headingBlock("A child's future shouldn't depend on luck"),
      textBlock(
        "In the communities we serve, a single setback — a lost job, an illness, a season of hunger — can pull a child out of school for good.",
      ),
      textBlock(
        "Without steady support, children go without meals, miss classes, and lose the chance to build a different life.",
      ),
    ],
    whatWeDo: [
      headingBlock("We walk alongside sponsored children"),
      textBlock(
        "Monthly sponsors provide food, clothing, school fees, and supplies. Local partners check in regularly and share updates on each child's progress.",
      ),
      textBlock(
        "Your gift is a long-term partnership — not a one-time handout. Sponsors see the difference their share makes, month after month.",
      ),
    ],
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
    relatedStories: [
      {
        _id: "story-youth-shoe-drive",
        title: "Youth volunteers deliver 500 pairs of shoes",
        slug: "youth-shoe-drive",
        tags: ["youth"],
        excerpt:
          "Ongshi students organized, inventoried, and handed out shoes through Soles4Souls.",
        imageUrl: "/images/youth-volunteers.jpg",
        imageAlt: "Youth volunteers",
      },
    ],
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
