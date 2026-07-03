import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import { EVENT_CATEGORY_LABELS } from "@/lib/eventCategories";
import { formatEventDate } from "@/lib/formatEventDate";

export function EventHero({
  category,
  title,
  summary,
  startDate,
  endDate,
  location,
  heroImageUrl,
  heroImageAlt,
  cta,
}: {
  category: string;
  title: string;
  summary: string;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  cta?: { label: string; url: string } | null;
}) {
  const categoryLabel = EVENT_CATEGORY_LABELS[category] ?? category;
  const dateLabel = formatEventDate(startDate, endDate);
  const hasImage = Boolean(heroImageUrl);

  return (
    <section className="border-b border-line pt-10 pb-12 md:pt-20 md:pb-16">
      <Wrap>
        <div
          className={
            hasImage
              ? "grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-[clamp(2rem,5vw,4.5rem)]"
              : "max-w-[720px]"
          }
        >
          <div className={hasImage ? "order-2 lg:order-1" : undefined}>
            <Eyebrow>{categoryLabel}</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
              {title}
            </h1>
            <p className="mt-5 max-w-[42ch] text-[1.12rem] text-muted">{summary}</p>
            <div className="mt-5 space-y-2 text-[1rem] text-muted">
              <p className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-green-deep" aria-hidden />
                <time dateTime={startDate}>{dateLabel}</time>
              </p>
              {location ? (
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-deep" aria-hidden />
                  <span>{location}</span>
                </p>
              ) : null}
            </div>
            {cta ? (
              <div className="mt-8">
                <Button href={cta.url}>{cta.label}</Button>
              </div>
            ) : null}
          </div>

          {hasImage ? (
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] shadow-[0_22px_44px_-24px_rgba(20,40,20,0.35)]">
                <Image
                  src={heroImageUrl!}
                  alt={heroImageAlt ?? title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          ) : null}
        </div>
      </Wrap>
    </section>
  );
}
