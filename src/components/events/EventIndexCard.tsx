import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

import { formatEventDate } from "@/lib/formatEventDate";
import type { EventCard } from "@/lib/sanity/events";

export function EventIndexCard({ event }: { event: EventCard }) {
  const href = `/events/${event.slug}`;
  const dateLabel = formatEventDate(event.startDate, event.endDate);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(20,40,20,0.4)]">
      {event.imageUrl ? (
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.imageAlt ?? event.title}
            fill
            className="object-cover transition duration-400 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.35rem] font-semibold leading-tight">
          <Link href={href} className="text-ink hover:text-green-deep">
            {event.title}
          </Link>
        </h3>
        <div className="mt-3 space-y-1.5 text-[0.95rem] text-muted">
          <p className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-green-deep" aria-hidden />
            <time dateTime={event.startDate}>{dateLabel}</time>
          </p>
          {event.location ? (
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-deep" aria-hidden />
              <span>{event.location}</span>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
