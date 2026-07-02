import Image from "next/image";
import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import type { HomeStory } from "@/lib/fallbacks/home";

const tagLabels: Record<string, string> = {
  youth: "Youth",
  health: "Health care",
  relief: "Relief & rehab",
  education: "Education",
  bangladesh: "Bangladesh",
  texas: "Texas",
};

function formatTag(tags?: string[] | null) {
  const tag = tags?.[0];
  if (!tag) return "Update";
  return tagLabels[tag] ?? tag;
}

export function ProgramRelatedStories({ stories }: { stories: HomeStory[] }) {
  if (!stories.length) {
    return null;
  }

  return (
    <section className="border-t border-line py-14 md:py-24">
      <Wrap>
        <div className="mb-10 max-w-[640px]">
          <Eyebrow>From the field</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-semibold leading-tight tracking-tight text-ink">
            Related stories
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article key={story._id} className="group flex flex-col">
              <Link href={`/stories/${story.slug}`} className="block">
                {story.imageUrl ? (
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[14px]">
                    <Image
                      src={story.imageUrl}
                      alt={story.imageAlt ?? story.title}
                      fill
                      className="object-cover transition duration-400 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : null}
              </Link>
              <div className="mb-1.5 text-[0.82rem] font-semibold uppercase tracking-wide text-green-deep">
                {formatTag(story.tags)}
              </div>
              <h3 className="font-display text-[1.28rem] font-semibold leading-tight">
                <Link href={`/stories/${story.slug}`} className="hover:text-green-deep">
                  {story.title}
                </Link>
              </h3>
              {story.excerpt ? (
                <p className="mt-2 line-clamp-3 text-[0.95rem] text-muted">{story.excerpt}</p>
              ) : null}
            </article>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
