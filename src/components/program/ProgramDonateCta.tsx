import { Button } from "@/components/ui/Button";
import { Wrap } from "@/components/ui/Wrap";
import { getGeneralDonateUrl } from "@/lib/donation";
import type { DonationConfig } from "@/lib/donation";

export function ProgramDonateCta({
  title,
  sponsorable,
  sponsorUrl,
  donation,
}: {
  title: string;
  sponsorable?: boolean | null;
  sponsorUrl?: string | null;
  donation?: DonationConfig | null;
}) {
  const donateUrl =
    sponsorable !== false ? sponsorUrl : getGeneralDonateUrl(donation);

  if (!donateUrl) {
    return null;
  }

  const ctaLabel = sponsorable !== false ? "Sponsor" : "Donate";

  return (
    <section className="relative overflow-hidden border-t border-line bg-gradient-to-br from-green-deep to-green-ink text-white">
      <div
        className="pointer-events-none absolute right-[-90px] top-1/2 z-[1] h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-dashed border-white/20 after:absolute after:inset-9 after:rounded-full after:border after:border-dashed after:border-white/16"
        aria-hidden
      />
      <Wrap className="relative z-[2] py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_auto]">
          <div>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.4rem)] font-semibold leading-tight text-white">
              Be part of {title.toLowerCase()}
            </h2>
            <p className="mt-3 max-w-[48ch] text-[#D6EBDB]">
              Your share makes this work possible. Every gift is a hand held — across
              Bangladesh and Austin, Texas.
            </p>
          </div>
          <Button href={donateUrl} variant="light">
            {ctaLabel} →
          </Button>
        </div>
      </Wrap>
    </section>
  );
}
