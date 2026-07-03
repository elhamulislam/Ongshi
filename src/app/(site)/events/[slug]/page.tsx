import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetails } from "@/components/events/EventDetails";
import { EventGallery } from "@/components/events/EventGallery";
import { EventHero } from "@/components/events/EventHero";
import { EventOutcome } from "@/components/events/EventOutcome";
import { getEventCta } from "@/lib/eventCta";
import { getEventBySlug, getSiteSettings } from "@/lib/sanity/loaders";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.seo?.metaTitle ?? event.title,
    description: event.seo?.metaDescription ?? event.summary,
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const [event, settings] = await Promise.all([
    getEventBySlug(slug),
    getSiteSettings(),
  ]);

  if (!event) {
    notFound();
  }

  const cta = getEventCta(event, settings.donation);

  return (
    <>
      <EventHero
        category={event.category}
        title={event.title}
        summary={event.summary}
        startDate={event.startDate}
        endDate={event.endDate}
        location={event.location}
        heroImageUrl={event.heroImageUrl}
        heroImageAlt={event.heroImageAlt}
        cta={cta}
      />
      <EventDetails details={event.details} />
      <EventOutcome outcome={event.outcome} />
      <EventGallery gallery={event.gallery} />
    </>
  );
}
