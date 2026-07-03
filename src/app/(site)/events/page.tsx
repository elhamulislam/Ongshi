import type { Metadata } from "next";

import { EventsIntro, EventsPast, EventsUpcoming } from "@/components/events/EventsIndex";
import { getEventsIndex } from "@/lib/sanity/loaders";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past Ongshi events — eye camps, youth drives, fundraisers, and community gatherings in Bangladesh and Austin, Texas.",
};

export default async function EventsPage() {
  const { upcoming, past } = await getEventsIndex();

  return (
    <>
      <EventsIntro />
      <EventsUpcoming events={upcoming} />
      <EventsPast events={past} />
    </>
  );
}
