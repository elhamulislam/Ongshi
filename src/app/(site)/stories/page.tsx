import type { Metadata } from "next";

import { StoriesFeed, StoriesIntro } from "@/components/stories/StoriesFeed";
import { isStoryTag } from "@/lib/storyTags";
import { getStoriesIndex } from "@/lib/sanity/loaders";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Updates from Ongshi's work in Bangladesh and Austin — field stories from health camps, relief, youth projects, and more.",
};

type PageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function StoriesPage({ searchParams }: PageProps) {
  const { tag: tagParam } = await searchParams;
  const activeTag = tagParam && isStoryTag(tagParam) ? tagParam : null;
  const stories = await getStoriesIndex(activeTag ?? undefined);

  return (
    <>
      <StoriesIntro activeTag={activeTag} />
      <StoriesFeed stories={stories} activeTag={activeTag} />
    </>
  );
}
