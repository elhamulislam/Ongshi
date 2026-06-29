import Image from "next/image";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { Wrap } from "@/components/ui/Wrap";
import type { HomeProgram } from "@/lib/fallbacks/home";
import type { DonationConfig } from "@/lib/donation";
import { getProgramDonateUrl, getTierDonateUrl } from "@/lib/donation";

const programLinkLabels: Record<string, string> = {
  "sponsor-an-eye": "Sponsor an eye",
  "sponsor-a-village": "Sponsor a village",
  "sponsor-a-child": "Sponsor a child",
};

export function FeaturedPrograms({
  programs,
  donation,
}: {
  programs: HomeProgram[];
  donation?: DonationConfig | null;
}) {
  return (
    <section className="py-14 md:py-24" id="work">
      <Wrap>
        <div className="mb-10 max-w-[640px]">
          <Eyebrow>Ways to take part</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-semibold leading-tight tracking-tight text-ink">
            Three ways to be a partner in hope
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const isAccent = program.slug === "sponsor-a-child";
            const donateUrl = getProgramDonateUrl(program.donateUrlOverride, donation);
            const linkLabel =
              programLinkLabels[program.slug] ?? `Sponsor ${program.title.toLowerCase()}`;

            if (isAccent && program.suggestedGift) {
              return (
                <article
                  key={program._id}
                  className="relative flex flex-col justify-center overflow-hidden rounded-[18px] border border-green-deep bg-green-deep p-8 text-white"
                >
                  <div
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[14px] border-white/10"
                    aria-hidden
                  />
                  <span className="mb-4 inline-block w-fit rounded-full bg-white/16 px-3 py-1 text-[0.78rem] font-bold tracking-wide">
                    {program.suggestedGift}
                  </span>
                  <h3 className="font-display text-[1.4rem] font-semibold">{program.title}</h3>
                  <p className="mt-2 flex-1 text-[0.98rem] opacity-92">{program.summary}</p>
                  <TextLink
                    href={getTierDonateUrl("child", donation) || donateUrl}
                    light
                    className="mt-5"
                  >
                    {linkLabel}
                  </TextLink>
                </article>
              );
            }

            return (
              <article
                key={program._id}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(20,40,20,0.4)]"
              >
                {program.imageUrl ? (
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={program.imageUrl}
                      alt={program.imageAlt ?? program.title}
                      fill
                      className="object-cover transition duration-400 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.4rem] font-semibold">{program.title}</h3>
                  <p className="mt-2 flex-1 text-[0.98rem] text-muted">{program.summary}</p>
                  <TextLink href={donateUrl} className="mt-4">
                    {linkLabel}
                  </TextLink>
                </div>
              </article>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
