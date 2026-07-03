import { Wrap } from "@/components/ui/Wrap";
import { NewsletterEmbed } from "@/components/newsletter/NewsletterEmbed";
import type { SiteSettingsData } from "@/lib/fallbacks/home";

export function NewsletterStrip({
  newsletter,
}: {
  newsletter?: SiteSettingsData["newsletter"];
}) {
  const embed = newsletter?.newsletterEmbed?.trim();

  if (!embed) {
    return null;
  }

  return (
    <section className="bg-ink text-white">
      <Wrap className="py-10 text-center md:py-14">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] font-semibold text-white">
          Stay close to the work
        </h2>
        <p className="mx-auto mt-2 max-w-[46ch] text-[#c9c6c0]">
          A short note now and then — real stories from the field and the people your gifts
          reach.
        </p>
        <NewsletterEmbed html={embed} />
      </Wrap>
    </section>
  );
}
