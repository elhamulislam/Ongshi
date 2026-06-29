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
