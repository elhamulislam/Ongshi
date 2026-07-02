import type { HomeStat } from "@/lib/fallbacks/home";

export type DonatePageData = {
  headline: string;
  whyGive: string;
  whereYourMoneyGoes?: string | null;
  featuredStats: HomeStat[];
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};

export const fallbackDonatePage: DonatePageData = {
  headline: "Your share changes a life",
  whyGive:
    "Every gift to Ongshi goes directly to the work — restoring sight, rebuilding homes, and sponsoring children across Bangladesh and Austin, Texas. You choose how to give; we make sure it reaches the people who need it.",
  whereYourMoneyGoes:
    "Ongshi is volunteer-led. Your donation funds programs on the ground — not overhead.",
  featuredStats: [
    { value: "156", label: "cataract surgeries funded in 2025" },
    { value: "15+", label: "projects across two countries" },
    { value: "$30", label: "sponsors a child for a month" },
  ],
};
