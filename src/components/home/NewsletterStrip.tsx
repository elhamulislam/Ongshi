"use client";

import { Button } from "@/components/ui/Button";
import { Wrap } from "@/components/ui/Wrap";
import type { SiteSettingsData } from "@/lib/fallbacks/home";

export function NewsletterStrip({
  newsletter,
}: {
  newsletter?: SiteSettingsData["newsletter"];
}) {
  const signupUrl = newsletter?.signupUrl;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (signupUrl) {
      window.location.href = signupUrl;
    }
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
        <form
          className="mx-auto mt-6 flex max-w-[460px] flex-wrap justify-center gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="you@email.com"
            aria-label="Email address"
            required
            className="min-w-[220px] flex-1 rounded-full border border-[#4a4843] bg-[#332f2b] px-4 py-3.5 text-base text-white placeholder:text-[#a39e97] focus-visible:outline focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-2"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </Wrap>
    </section>
  );
}
