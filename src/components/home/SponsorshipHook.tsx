import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import type { HomePageData } from "@/lib/fallbacks/home";
import type { DonationConfig } from "@/lib/donation";
import { getDonateUrl, getTierDonateUrl } from "@/lib/donation";

export function SponsorshipHook({
  hook,
  donation,
}: {
  hook: HomePageData["sponsorshipHook"];
  donation?: DonationConfig | null;
}) {
  const sponsorUrl = getTierDonateUrl("child", donation) || getDonateUrl(donation);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-green-deep to-green-ink text-white"
      id="donate"
    >
      <div
        className="pointer-events-none absolute right-[-90px] top-1/2 z-[1] h-[340px] w-[340px] -translate-y-1/2 rounded-full border border-dashed border-white/20 after:absolute after:inset-9 after:rounded-full after:border after:border-dashed after:border-white/16"
        aria-hidden
      />
      <Wrap className="relative z-[2] py-12 md:py-[4.5rem]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_auto]">
          <div>
            <Eyebrow className="text-[#A7DBB3]">Become a monthly partner</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-tight text-white">
              {hook.headline}
            </h2>
            <p className="mt-3 max-w-[48ch] text-[#D6EBDB]">{hook.text}</p>
          </div>
          <Button href={sponsorUrl} variant="light">
            {hook.ctaLabel} →
          </Button>
        </div>
      </Wrap>
    </section>
  );
}
