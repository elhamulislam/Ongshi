import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

export function OurWorkIntro() {
  return (
    <section className="border-b border-line pt-10 pb-12 md:pt-16 md:pb-16">
      <Wrap>
        <div className="max-w-[720px]">
          <Eyebrow>Our work</Eyebrow>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
            Evergreen programs you can stand behind
          </h1>
          <p className="mt-5 text-[1.12rem] leading-[1.68] text-muted">
            Ongshi&apos;s work spans health care, relief and rehab, and education —
            restoring sight, rebuilding after floods, sponsoring children, and bringing
            care to communities across Bangladesh and Austin, Texas. Each program is a
            lasting way to be part of it.
          </p>
        </div>
      </Wrap>
    </section>
  );
}
