import { Wrap } from "@/components/ui/Wrap";

import { YouthEyebrow } from "./YouthEyebrow";

export function YouthIntro({
  headline,
  intro,
  whyJoin,
}: {
  headline: string;
  intro: string;
  whyJoin?: string | null;
}) {
  return (
    <section className="border-b border-line pt-10 pb-12 md:pt-16 md:pb-16">
      <Wrap>
        <div className="max-w-[720px]">
          <YouthEyebrow>Ongshi Youth</YouthEyebrow>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
            {headline}
          </h1>
          <p className="mt-5 text-[1.12rem] leading-[1.68] text-muted">{intro}</p>
          {whyJoin ? (
            <p className="mt-4 text-[1.12rem] leading-[1.68] text-muted">{whyJoin}</p>
          ) : null}
        </div>
      </Wrap>
    </section>
  );
}
