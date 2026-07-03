import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

export function EventOutcome({ outcome }: { outcome?: string | null }) {
  if (!outcome) {
    return null;
  }

  return (
    <section className="border-b border-line bg-green-tint/40 py-14 md:py-20">
      <Wrap>
        <div className="max-w-[720px]">
          <Eyebrow>What happened</Eyebrow>
          <p className="mt-4 text-[1.12rem] leading-[1.68] text-muted">{outcome}</p>
        </div>
      </Wrap>
    </section>
  );
}
