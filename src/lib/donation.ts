export type SponsorshipTierKey = "eye" | "child" | "village" | "cervical-cancer";

export const DONATE_HUB_PATH = "/donate";

export const TIER_ORDER: SponsorshipTierKey[] = [
  "eye",
  "cervical-cancer",
  "village",
  "child",
];

export type DonationConfig = {
  platform?: "zeffy" | null;
  primaryUrl?: string | null;
  sponsorshipTiers?: Array<{
    key?: SponsorshipTierKey | null;
    label?: string | null;
    amount?: string | null;
    whatItFunds?: string | null;
    url?: string | null;
  }> | null;
};

export type SponsorshipTier = NonNullable<DonationConfig["sponsorshipTiers"]>[number];

const PROGRAM_TIER_KEYS: Record<string, SponsorshipTierKey> = {
  "sponsor-an-eye": "eye",
  "sponsor-a-village": "village",
  "sponsor-a-child": "child",
  "cervical-cancer-elimination": "cervical-cancer",
};

/** Site-wide Donate nav — always the donate hub, never a Zeffy URL. */
export function getDonateHubPath(): string {
  return DONATE_HUB_PATH;
}

/** Base / general Zeffy campaign from site settings. */
export function getGeneralDonateUrl(donation?: DonationConfig | null): string | null {
  return donation?.primaryUrl ?? null;
}

export function getOrderedSponsorshipTiers(
  donation?: DonationConfig | null,
): SponsorshipTier[] {
  const tiers = donation?.sponsorshipTiers ?? [];
  return TIER_ORDER.map((key) => tiers.find((tier) => tier.key === key)).filter(
    (tier): tier is SponsorshipTier => Boolean(tier?.url),
  );
}

export function getTierDonateUrl(
  tierKey: SponsorshipTierKey,
  donation?: DonationConfig | null,
): string | null {
  const tier = donation?.sponsorshipTiers?.find((t) => t.key === tierKey);
  return tier?.url ?? null;
}

export function getProgramDonateUrl(
  programOverride: string | null | undefined,
  donation?: DonationConfig | null,
): string | null {
  if (programOverride) {
    return programOverride;
  }
  return getGeneralDonateUrl(donation);
}

/** Sponsor/Donate URL for a program — override, then cause tier, then general campaign. */
export function getProgramSponsorUrl(
  slug: string,
  programOverride?: string | null,
  donation?: DonationConfig | null,
): string | null {
  if (programOverride) {
    return programOverride;
  }
  const tierKey = PROGRAM_TIER_KEYS[slug];
  if (tierKey) {
    const tierUrl = getTierDonateUrl(tierKey, donation);
    if (tierUrl) {
      return tierUrl;
    }
  }
  return getGeneralDonateUrl(donation);
}

/** @deprecated Use getDonateHubPath() for navigation or getGeneralDonateUrl() for the base Zeffy link. */
export function getDonateUrl(donation?: DonationConfig | null): string {
  return getDonateHubPath();
}

export function hasDonateHubContent(donation?: DonationConfig | null): boolean {
  return Boolean(getGeneralDonateUrl(donation) || getOrderedSponsorshipTiers(donation).length);
}
