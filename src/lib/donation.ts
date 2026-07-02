export type DonationConfig = {
  platform?: "givebutter" | "zeffy" | "other" | null;
  mode?: "embed" | "link" | null;
  primaryUrl?: string | null;
  primaryEmbed?: string | null;
  sponsorshipTiers?: Array<{
    key?: "eye" | "child" | "village" | null;
    label?: string | null;
    amount?: string | null;
    whatItFunds?: string | null;
    url?: string | null;
    embed?: string | null;
  }> | null;
};

/** Primary donate destination — never hardcode platform URLs in components. */
export function getDonateUrl(donation?: DonationConfig | null): string {
  if (donation?.primaryUrl) {
    return donation.primaryUrl;
  }
  return "/donate";
}

export function getProgramDonateUrl(
  programOverride: string | null | undefined,
  donation?: DonationConfig | null,
): string {
  if (programOverride) {
    return programOverride;
  }
  return getDonateUrl(donation);
}

export function getTierDonateUrl(
  tierKey: "eye" | "child" | "village",
  donation?: DonationConfig | null,
): string {
  const tier = donation?.sponsorshipTiers?.find((t) => t.key === tierKey);
  if (tier?.url) {
    return tier.url;
  }
  return getDonateUrl(donation);
}

const PROGRAM_TIER_KEYS: Record<string, "eye" | "child" | "village"> = {
  "sponsor-an-eye": "eye",
  "sponsor-a-village": "village",
  "sponsor-a-child": "child",
};

/** Sponsor/Donate URL for a program — respects override, then tier, then global config. */
export function getProgramSponsorUrl(
  slug: string,
  programOverride?: string | null,
  donation?: DonationConfig | null,
): string {
  if (programOverride) {
    return programOverride;
  }
  const tier = PROGRAM_TIER_KEYS[slug];
  if (tier) {
    return getTierDonateUrl(tier, donation);
  }
  return getDonateUrl(donation);
}
