import Image from "next/image";
import Link from "next/link";

import { formatStoryDate } from "@/lib/formatStoryDate";
import { formatStoryTag } from "@/lib/storyTags";
import type { StoryCard } from "@/lib/sanity/story";

export function StoryIndexCard({ story }: { story: StoryCard }) {
  const href = `/stories/${story.slug}`;

  return (
    <article className="group flex flex-col">
      <Link href={href} className="block">
        {story.imageUrl ? (
          <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[14px]">
            <Image
              src={story.imageUrl}
              alt={story.imageAlt ?? story.title}
              fill
              className="object-cover transition duration-400 group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : null}
      </Link>
      <time
        dateTime={story.publishedAt}
        className="text-[0.82rem] font-semibold uppercase tracking-wide text-muted"
      >
        {formatStoryDate(story.publishedAt)}
      </time>
      <div className="mt-1.5 text-[0.82rem] font-semibold uppercase tracking-wide text-green-deep">
        {formatStoryTag(story.tags)}
      </div>
      <h2 className="mt-1 font-display text-[1.28rem] font-semibold leading-tight">
        <Link href={href} className="text-ink hover:text-green-deep">
          {story.title}
        </Link>
      </h2>
      {story.excerpt ? (
        <p className="mt-2 line-clamp-3 text-[0.95rem] text-muted">{story.excerpt}</p>
      ) : null}
    </article>
  );
}
