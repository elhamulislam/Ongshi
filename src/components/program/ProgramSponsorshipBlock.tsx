import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

export function ProgramSponsorshipBlock({
  suggestedGift,
  whatGiftFunds,
  sponsorUrl,
}: {
  suggestedGift?: string | null;
  whatGiftFunds?: string | null;
  sponsorUrl: string;
}) {
  if (!whatGiftFunds) {
    return null;
  }

  return (
    <section className="border-t border-line bg-green-tint py-14 md:py-24">
      <Wrap>
        <div className="mx-auto max-w-[720px] rounded-[18px] border border-line bg-white p-8 md:p-10">
          <Eyebrow>What your gift funds</Eyebrow>
          {suggestedGift ? (
            <p className="mt-4 inline-block rounded-full bg-green-tint px-3 py-1 text-[0.85rem] font-bold tracking-wide text-green-deep">
              {suggestedGift}
            </p>
          ) : null}
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-tight text-ink">
            Your sponsorship at work
          </h2>
          <p className="mt-4 text-[1.05rem] leading-[1.68] text-muted">{whatGiftFunds}</p>
          <div className="mt-8">
            <Button href={sponsorUrl}>
              {suggestedGift ? `Sponsor — ${suggestedGift}` : "Sponsor"}
            </Button>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
