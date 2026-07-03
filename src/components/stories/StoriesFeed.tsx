import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import { STORY_TAG_OPTIONS, type StoryTag } from "@/lib/storyTags";
import type { StoryCard } from "@/lib/sanity/story";

import { StoryIndexCard } from "./StoryIndexCard";

function TagFilter({
  activeTag,
}: {
  activeTag?: StoryTag | null;
}) {
  return (
    <nav aria-label="Filter stories by topic" className="mt-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/stories"
            className={`inline-flex rounded-full border px-4 py-2 text-[0.9rem] font-semibold transition ${
              !activeTag
                ? "border-green-deep bg-green-deep text-white"
                : "border-line bg-white text-ink hover:border-green hover:bg-green-tint"
            }`}
            aria-current={!activeTag ? "page" : undefined}
          >
            All
          </Link>
        </li>
        {STORY_TAG_OPTIONS.map((tag) => (
          <li key={tag.value}>
            <Link
              href={`/stories?tag=${tag.value}`}
              className={`inline-flex rounded-full border px-4 py-2 text-[0.9rem] font-semibold transition ${
                activeTag === tag.value
                  ? "border-green-deep bg-green-deep text-white"
                  : "border-line bg-white text-ink hover:border-green hover:bg-green-tint"
              }`}
              aria-current={activeTag === tag.value ? "page" : undefined}
            >
              {tag.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function StoriesIntro({ activeTag }: { activeTag?: StoryTag | null }) {
  return (
    <section className="border-b border-line pt-10 pb-12 md:pt-16 md:pb-16">
      <Wrap>
        <div className="max-w-[720px]">
          <Eyebrow>Stories</Eyebrow>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
            From the field
          </h1>
          <p className="mt-5 text-[1.12rem] leading-[1.68] text-muted">
            Short updates from Bangladesh and Austin — the people your gifts reach and
            the volunteers who make it happen.
          </p>
          <TagFilter activeTag={activeTag} />
        </div>
      </Wrap>
    </section>
  );
}

export function StoriesFeed({
  stories,
  activeTag,
}: {
  stories: StoryCard[];
  activeTag?: StoryTag | null;
}) {
  if (!stories.length) {
    return null;
  }

  return (
    <section className="py-14 md:py-20">
      <Wrap>
        {activeTag ? (
          <p className="mb-8 text-[0.95rem] text-muted">
            Showing stories tagged{" "}
            <span className="font-semibold text-ink">
              {STORY_TAG_OPTIONS.find((tag) => tag.value === activeTag)?.label}
            </span>
            .
          </p>
        ) : null}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryIndexCard key={story._id} story={story} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
