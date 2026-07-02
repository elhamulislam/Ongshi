import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

export function DonateIntro({
  headline,
  whyGive,
}: {
  headline: string;
  whyGive: string;
}) {
  return (
    <section className="border-b border-line pt-10 pb-12 md:pt-16 md:pb-16">
      <Wrap>
        <div className="max-w-[720px]">
          <Eyebrow>Give</Eyebrow>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
            {headline}
          </h1>
          <p className="mt-5 text-[1.12rem] leading-[1.68] text-muted">{whyGive}</p>
        </div>
      </Wrap>
    </section>
  );
}
