import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import { FeaturedPrograms } from "@/components/home/FeaturedPrograms";
import { GetInvolvedStrip } from "@/components/home/GetInvolvedStrip";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { LatestStories } from "@/components/home/LatestStories";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { SponsorshipHook } from "@/components/home/SponsorshipHook";
import {
  getHomePageData,
  getPartners,
  getSiteSettings,
} from "@/lib/sanity/loaders";

export default async function Home() {
  const settings = await getSiteSettings();
  const home = await getHomePageData(settings.donation);
  const partners = await getPartners();

  return (
    <>
      <section className="overflow-x-clip py-10 md:py-20">
        <Wrap>
          <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-[clamp(2rem,5vw,4.5rem)]">
            <div className="min-w-0">
              <Eyebrow>{settings.tagline ?? "Partner in hope"}</Eyebrow>
              <HeroHeadline text={home.heroHeadline} />
              <p className="mt-5 max-w-none text-[1.18rem] text-muted lg:max-w-[30ch]">
                {home.heroSubtext}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={home.heroPrimaryCta.url}>{home.heroPrimaryCta.label}</Button>
                <Button href={home.heroSecondaryCta.url} variant="ghost">
                  {home.heroSecondaryCta.label}{" "}
                  <span aria-hidden className="inline-block">
                    →
                  </span>
                </Button>
              </div>
            </div>
            <div className="order-first min-w-0 w-full lg:order-none">
              <HeroCarousel slides={home.heroSlides} />
            </div>
          </div>
        </Wrap>
      </section>

      <ImpactStrip stats={home.featuredStats} />
      <FeaturedPrograms programs={home.featuredPrograms} donation={settings.donation} />
      <SponsorshipHook hook={home.sponsorshipHook} donation={settings.donation} />
      <LatestStories stories={home.featuredStories} />
      <GetInvolvedStrip />
      <PartnersStrip partners={partners} />
      <NewsletterStrip newsletter={settings.newsletter} />
    </>
  );
}
