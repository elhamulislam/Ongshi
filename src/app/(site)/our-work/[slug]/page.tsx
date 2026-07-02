import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProgramHero } from "@/components/program/ProgramHero";
import { getProgramSponsorUrl } from "@/lib/donation";
import { getProgramBySlug, getSiteSettings } from "@/lib/sanity/loaders";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return { title: "Program not found" };
  }

  return {
    title: program.seo?.metaTitle ?? program.title,
    description: program.seo?.metaDescription ?? program.summary,
  };
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const [program, settings] = await Promise.all([
    getProgramBySlug(slug),
    getSiteSettings(),
  ]);

  if (!program) {
    notFound();
  }

  const sponsorUrl = getProgramSponsorUrl(
    program.slug,
    program.donateUrlOverride,
    settings.donation,
  );

  return (
    <>
      <ProgramHero
        pillar={program.pillar}
        title={program.title}
        summary={program.summary}
        heroImageUrl={program.heroImageUrl}
        heroImageAlt={program.heroImageAlt}
        sponsorUrl={sponsorUrl}
        sponsorable={program.sponsorable}
        suggestedGift={program.suggestedGift}
      />
    </>
  );
}
