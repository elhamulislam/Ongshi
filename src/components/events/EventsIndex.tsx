import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import type { EventCard } from "@/lib/sanity/events";

import { EventIndexCard } from "./EventIndexCard";

export function EventsIntro() {
  return (
    <section className="border-b border-line pt-10 pb-12 md:pt-16 md:pb-16">
      <Wrap>
        <div className="max-w-[720px]">
          <Eyebrow>Events</Eyebrow>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
            Camps, drives, and gatherings
          </h1>
          <p className="mt-5 text-[1.12rem] leading-[1.68] text-muted">
            Eye camps, youth drives, fundraisers, and community events across Bangladesh
            and Austin — ways to show up alongside the work.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

export function EventsUpcoming({ events }: { events: EventCard[] }) {
  if (!events.length) {
    return null;
  }

  return (
    <section className="border-b border-line py-14 md:py-20" id="upcoming">
      <Wrap>
        <div className="mb-10 max-w-[640px]">
          <Eyebrow>Upcoming</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-tight text-ink">
            On the calendar
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventIndexCard key={event._id} event={event} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function EventsPast({ events }: { events: EventCard[] }) {
  if (!events.length) {
    return null;
  }

  return (
    <section className="bg-green-tint/40 py-14 md:py-20" id="past">
      <Wrap>
        <div className="mb-10 max-w-[640px]">
          <Eyebrow>Past events</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-tight text-ink">
            Archive
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventIndexCard key={event._id} event={event} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
