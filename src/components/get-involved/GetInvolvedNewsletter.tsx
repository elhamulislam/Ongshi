import { Mail } from "lucide-react";

import { Wrap } from "@/components/ui/Wrap";
import { NewsletterEmbed } from "@/components/newsletter/NewsletterEmbed";

const defaultNewsletterHeadline = "Stay close to the work";
const defaultNewsletterText =
  "A short note now and then — real stories from the field and the people your gifts reach.";

export function GetInvolvedNewsletter({
  headline,
  text,
  newsletterEmbed,
}: {
  headline?: string | null;
  text?: string | null;
  newsletterEmbed?: string | null;
}) {
  const embed = newsletterEmbed?.trim();

  if (!embed) {
    return null;
  }

  return (
    <section className="bg-ink text-white" id="newsletter">
      <Wrap className="py-14 text-center md:py-20">
        <div className="mx-auto max-w-[640px]">
          <div
            className="mx-auto mb-5 inline-flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[#332f2b] text-[#CFE6D4]"
            aria-hidden
          >
            <Mail className="h-7 w-7" />
          </div>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
            {headline ?? defaultNewsletterHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[1.05rem] leading-[1.65] text-[#c9c6c0]">
            {text ?? defaultNewsletterText}
          </p>
          <NewsletterEmbed html={embed} />
        </div>
      </Wrap>
    </section>
  );
}
