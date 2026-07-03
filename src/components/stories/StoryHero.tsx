import Image from "next/image";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import { formatStoryDate } from "@/lib/formatStoryDate";
import { formatStoryTag } from "@/lib/storyTags";

export function StoryHero({
  title,
  publishedAt,
  tags,
  coverImageUrl,
  coverImageAlt,
}: {
  title: string;
  publishedAt: string;
  tags?: string[] | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
}) {
  const hasCover = Boolean(coverImageUrl);

  return (
    <section className="border-b border-line pt-10 pb-12 md:pt-16 md:pb-16">
      <Wrap>
        <div
          className={
            hasCover
              ? "grid items-start gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-[clamp(2rem,5vw,4.5rem)]"
              : "max-w-[720px]"
          }
        >
          <div className={hasCover ? "order-2 lg:order-1" : undefined}>
            <Eyebrow>{formatStoryTag(tags)}</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
              {title}
            </h1>
            <time
              dateTime={publishedAt}
              className="mt-5 block text-[0.95rem] font-semibold uppercase tracking-wide text-muted"
            >
              {formatStoryDate(publishedAt)}
            </time>
          </div>

          {hasCover ? (
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] shadow-[0_22px_44px_-24px_rgba(20,40,20,0.35)]">
                <Image
                  src={coverImageUrl!}
                  alt={coverImageAlt ?? title}
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
