import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StoryBody } from "@/components/stories/StoryBody";
import { StoryFooter } from "@/components/stories/StoryFooter";
import { StoryHero } from "@/components/stories/StoryHero";
import { StoryRelated } from "@/components/stories/StoryRelated";
import { getStoryBySlug } from "@/lib/sanity/loaders";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return { title: "Story not found" };
  }

  return {
    title: story.seo?.metaTitle ?? story.title,
    description: story.seo?.metaDescription ?? undefined,
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <>
      <StoryHero
        title={story.title}
        publishedAt={story.publishedAt}
        tags={story.tags}
        coverImageUrl={story.coverImageUrl}
        coverImageAlt={story.coverImageAlt}
      />
      <StoryBody body={story.body} />
      <StoryRelated about={story.about} />
      <StoryFooter title={story.title} slug={story.slug} />
    </>
  );
}
