import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import { PILLAR_LABELS } from "@/lib/fallbacks/program";

export function ProgramHero({
  pillar,
  title,
  summary,
  heroImageUrl,
  heroImageAlt,
  sponsorUrl,
  sponsorable,
  suggestedGift,
}: {
  pillar: string;
  title: string;
  summary: string;
  heroImageUrl: string;
  heroImageAlt: string;
  sponsorUrl: string;
  sponsorable?: boolean | null;
  suggestedGift?: string | null;
}) {
  const pillarLabel = PILLAR_LABELS[pillar] ?? pillar;

  return (
    <section className="border-b border-line pt-10 pb-12 md:pt-20 md:pb-16">
      <Wrap>
        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-[clamp(2rem,5vw,4.5rem)]">
          <div className="order-2 lg:order-1">
            <Eyebrow>{pillarLabel}</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
              {title}
            </h1>
            <p className="mt-5 max-w-[42ch] text-[1.12rem] text-muted">{summary}</p>
            {sponsorable !== false ? (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={sponsorUrl}>
                  {suggestedGift ? `Sponsor — ${suggestedGift}` : "Sponsor"}
                </Button>
              </div>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] shadow-[0_22px_44px_-24px_rgba(20,40,20,0.35)]">
              <Image
                src={heroImageUrl}
                alt={heroImageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
