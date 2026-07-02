import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { Wrap } from "@/components/ui/Wrap";
import type { DonationConfig } from "@/lib/donation";
import {
  getGeneralDonateUrl,
  getOrderedSponsorshipTiers,
  hasDonateHubContent,
} from "@/lib/donation";

export function DonateOptions({ donation }: { donation?: DonationConfig | null }) {
  if (!hasDonateHubContent(donation)) {
    return null;
  }

  const generalUrl = getGeneralDonateUrl(donation);
  const tiers = getOrderedSponsorshipTiers(donation);

  return (
    <section className="bg-green-tint py-14 md:py-24" aria-label="Donation options">
      <Wrap>
        {generalUrl ? (
          <div className="mx-auto max-w-[640px] text-center">
            <Eyebrow>Make a gift</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-tight text-ink">
              Give where it&apos;s needed most
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted">
              Your gift supports Ongshi&apos;s work across all our programs — on Zeffy, our
              secure donation partner.
            </p>
            <Button href={generalUrl} className="mt-8">
              Donate
            </Button>
          </div>
        ) : null}

        {tiers.length > 0 ? (
          <div className={generalUrl ? "mt-14 md:mt-20" : undefined}>
            <div className="mb-10 max-w-[640px]">
              <Eyebrow>Sponsor a cause</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-tight text-ink">
                Or choose where your gift goes
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {tiers.map((tier) => {
                const isChild = tier.key === "child";
                const tierUrl = tier.url!;

                if (isChild && tier.amount) {
                  return (
                    <article
                      key={tier.key}
                      className="relative flex flex-col justify-center overflow-hidden rounded-[18px] border border-green-deep bg-green-deep p-8 text-white"
                    >
                      <div
                        className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[14px] border-white/10"
                        aria-hidden
                      />
                      {tier.amount ? (
                        <span className="mb-4 inline-block w-fit rounded-full bg-white/16 px-3 py-1 text-[0.78rem] font-bold tracking-wide">
                          {tier.amount}
                        </span>
                      ) : null}
                      <h3 className="font-display text-[1.4rem] font-semibold">{tier.label}</h3>
                      {tier.whatItFunds ? (
                        <p className="mt-2 flex-1 text-[0.98rem] opacity-92">{tier.whatItFunds}</p>
                      ) : null}
                      <TextLink href={tierUrl} light className="mt-5">
                        Sponsor
                      </TextLink>
                    </article>
                  );
                }

                return (
                  <article
                    key={tier.key}
                    className="flex flex-col rounded-[18px] border border-line bg-white p-8"
                  >
                    {tier.amount ? (
                      <span className="mb-3 inline-block w-fit rounded-full bg-green-tint px-3 py-1 text-[0.78rem] font-bold tracking-wide text-green-deep">
                        {tier.amount}
                      </span>
                    ) : null}
                    <h3 className="font-display text-[1.4rem] font-semibold">{tier.label}</h3>
                    {tier.whatItFunds ? (
                      <p className="mt-2 flex-1 text-[0.98rem] text-muted">{tier.whatItFunds}</p>
                    ) : null}
                    <TextLink href={tierUrl} className="mt-5">
                      Sponsor
                    </TextLink>
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}
      </Wrap>
    </section>
  );
}
