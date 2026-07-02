import type { HomePageData, SiteSettingsData } from "@/lib/fallbacks/home";
import type { DonationConfig } from "@/lib/donation";
import { getDonateUrl, getTierDonateUrl } from "@/lib/donation";

export function resolveDonationUrl(
  url: string | null | undefined,
  donation: DonationConfig | null | undefined,
  tier?: "eye" | "child" | "village",
): string {
  if (url) {
    return url;
  }
  if (tier) {
    return getTierDonateUrl(tier, donation);
  }
  return getDonateUrl(donation);
}

export function resolveHomePageData(
  page: HomePageData,
  donation?: SiteSettingsData["donation"],
): HomePageData {
  return {
    ...page,
    heroPrimaryCta: {
      label: page.heroPrimaryCta.label,
      url: resolveDonationUrl(page.heroPrimaryCta.url, donation, "child"),
    },
    heroSecondaryCta: {
      label: page.heroSecondaryCta.label,
      url: page.heroSecondaryCta.url || "/our-work",
    },
    sponsorshipHook: {
      ...page.sponsorshipHook,
      ctaLabel: page.sponsorshipHook.ctaLabel,
    },
  };
}
