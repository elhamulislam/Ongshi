import type { DonationConfig } from "@/lib/donation";
import { getGeneralDonateUrl, getProgramSponsorUrl } from "@/lib/donation";

const CTA_LABELS = {
  register: "Register",
  donate: "Donate",
  volunteer: "Volunteer",
} as const;

type EventCtaInput = {
  ctaType?: string | null;
  ctaUrl?: string | null;
  supportsProgramSlug?: string | null;
};

export function getEventCta(
  event: EventCtaInput,
  donation?: DonationConfig | null,
): { label: string; url: string } | null {
  const type = event.ctaType;

  if (!type || type === "none") {
    return null;
  }

  if (type === "register" || type === "volunteer") {
    if (!event.ctaUrl) {
      return null;
    }

    return {
      label: CTA_LABELS[type],
      url: event.ctaUrl,
    };
  }

  if (type === "donate") {
    if (event.ctaUrl) {
      return { label: CTA_LABELS.donate, url: event.ctaUrl };
    }

    if (event.supportsProgramSlug) {
      const programUrl = getProgramSponsorUrl(
        event.supportsProgramSlug,
        null,
        donation,
      );
      if (programUrl) {
        return { label: CTA_LABELS.donate, url: programUrl };
      }
    }

    const generalUrl = getGeneralDonateUrl(donation);
    if (generalUrl) {
      return { label: CTA_LABELS.donate, url: generalUrl };
    }
  }

  return null;
}
