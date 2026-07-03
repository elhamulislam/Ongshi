import type { DonationConfig } from "@/lib/donation";

export type SiteSettingsData = {
  orgName?: string | null;
  tagline?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  address?: string | null;
  nonprofitLine?: string | null;
  social?: {
    facebook?: string | null;
    instagram?: string | null;
    x?: string | null;
    youtube?: string | null;
    linkedin?: string | null;
  } | null;
  newsletter?: {
    provider?: string | null;
    signupUrl?: string | null;
    newsletterEmbed?: string | null;
  } | null;
  donation?: DonationConfig | null;
};

export const fallbackSiteSettings: SiteSettingsData = {
  orgName: "Ongshi",
  tagline: "Partner in hope",
  contactEmail: "info@ongshi.org",
  address: "Austin, Texas",
  nonprofitLine:
    "Ongshi is a registered 501(c)(3) nonprofit. Donations are tax-deductible.",
  donation: {
    platform: "zeffy",
    primaryUrl: "https://www.zeffy.com/en-US/donation-form/ongshi-general",
    sponsorshipTiers: [
      {
        key: "eye",
        label: "Sponsor an Eye",
        amount: null,
        url: "https://www.zeffy.com/en-US/donation-form/ongshi-sponsor-an-eye",
      },
      {
        key: "cervical-cancer",
        label: "Cervical Cancer Elimination",
        amount: null,
        url: "https://www.zeffy.com/en-US/donation-form/ongshi-cervical-cancer",
      },
      {
        key: "child",
        label: "Sponsor a Child",
        amount: "$30 / month",
        url: "https://www.zeffy.com/en-US/donation-form/ongshi-sponsor-a-child",
      },
      {
        key: "village",
        label: "Sponsor a Village",
        amount: null,
        url: "https://www.zeffy.com/en-US/donation-form/ongshi-sponsor-a-village",
      },
    ],
  },
};

export type HeroSlide = {
  imageUrl: string;
  imageAlt: string;
  statValue: string;
  statLabel: string;
};

export type HomeProgram = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  suggestedGift?: string | null;
  sponsorable?: boolean | null;
  pillar?: string | null;
  donateUrlOverride?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export type HomeStat = {
  value: string;
  label: string;
};

export type HomeStory = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string | null;
  tags?: string[] | null;
  excerpt?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export type HomePageData = {
  heroSlides: HeroSlide[];
  heroHeadline: string;
  heroSubtext: string;
  heroPrimaryCta: { label: string; url: string };
  heroSecondaryCta: { label: string; url: string };
  sponsorshipHook: {
    headline: string;
    text: string;
    ctaLabel: string;
  };
  featuredPrograms: HomeProgram[];
  featuredStats: HomeStat[];
  featuredStories: HomeStory[];
};

export const fallbackHomePage: HomePageData = {
  heroSlides: [
    {
      imageUrl: "/images/hero-glasses.jpg",
      imageAlt:
        "An Ongshi volunteer fits glasses for an elderly man at an eye camp",
      statValue: "156",
      statLabel: "sights restored in 2025",
    },
    {
      imageUrl: "/images/youth-volunteers.jpg",
      imageAlt:
        "Ongshi youth volunteers and families with donation boxes in Austin, Texas",
      statValue: "40+",
      statLabel: "youth volunteers in Austin",
    },
    {
      imageUrl: "/images/rebuild-frame.jpg",
      imageAlt:
        "A home being rebuilt on a bamboo frame after flooding in Bangladesh",
      statValue: "20+",
      statLabel: "homes rebuilt after the floods",
    },
    {
      imageUrl: "/images/eye-camp.jpg",
      imageAlt: "A clinician examines a patient's eyes at an Ongshi eye camp",
      statValue: "1,500+",
      statLabel: "patients seen at eye camps",
    },
  ],
  heroHeadline: "Your share gives sight, shelter, and a future.",
  heroSubtext:
    "Ongshi is a community of volunteers restoring sight, rebuilding homes, and sponsoring children — across Bangladesh and Austin, Texas. Every gift is a hand held.",
  heroPrimaryCta: { label: "Sponsor a child", url: "/donate" },
  heroSecondaryCta: { label: "See our work", url: "/our-work" },
  featuredStats: [
    { value: "156", label: "cataract surgeries funded in 2025" },
    { value: "15+", label: "projects across two countries" },
    { value: "$30", label: "sponsors a child for a month" },
  ],
  featuredPrograms: [
    {
      _id: "eye",
      title: "Restore someone's sight",
      slug: "sponsor-an-eye",
      summary:
        "A simple cataract surgery brings a person's world back into focus. Your gift funds the operation, the camp, and the follow-up care.",
      imageUrl: "/images/eye-camp.jpg",
      imageAlt: "A clinician examines a patient's eyes at an Ongshi eye camp",
      sponsorable: true,
      pillar: "health-care",
    },
    {
      _id: "village",
      title: "Rebuild after the flood",
      slug: "sponsor-a-village",
      summary:
        "When the water takes everything, we help families rebuild their homes and their footing — board by board, roof by roof.",
      imageUrl: "/images/rebuild-roof.jpg",
      imageAlt: "A man fits a new metal roof onto a home being rebuilt after flooding",
      sponsorable: true,
      pillar: "relief-rehab",
    },
    {
      _id: "child",
      title: "Raise a child",
      slug: "sponsor-a-child",
      summary:
        "A monthly gift puts food on the table, clothes on their back, and a child in school — with updates on how they're growing.",
      suggestedGift: "$30 / month",
      sponsorable: true,
      pillar: "education",
    },
  ],
  sponsorshipHook: {
    headline: "For $30 a month, you sponsor a child's future.",
    text: "Food, clothing, and an education — and a clear line of sight to exactly where your gift goes. Cancel anytime; the difference lasts a lifetime.",
    ctaLabel: "Become a sponsor",
  },
  featuredStories: [
    {
      _id: "story-1",
      title: "Eye camp in Mymensingh restores sight to 156 patients",
      slug: "eye-camp-mymensingh",
      tags: ["health"],
      excerpt:
        "Over three days, volunteers screened hundreds and funded life-changing cataract surgeries.",
      imageUrl: "/images/eye-camp.jpg",
      imageAlt: "Eye camp",
    },
    {
      _id: "story-2",
      title: "Rebuilding homes, one roof at a time",
      slug: "rebuilding-homes",
      tags: ["relief"],
      excerpt:
        "After the floods receded, families returned to nothing. Here's how the rebuild is going.",
      imageUrl: "/images/rebuild-roof.jpg",
      imageAlt: "Rebuilding a home",
    },
    {
      _id: "story-3",
      title: "Youth volunteers deliver 500 pairs of shoes",
      slug: "youth-shoe-drive",
      tags: ["youth"],
      excerpt:
        "Ongshi students organized, inventoried, and handed out shoes through Soles4Souls.",
      imageUrl: "/images/youth-volunteers.jpg",
      imageAlt: "Youth volunteers",
    },
  ],
};

export const fallbackPartners = [
  { _id: "rotary", name: "Rotary International" },
  { _id: "soles", name: "Soles4Souls" },
];
