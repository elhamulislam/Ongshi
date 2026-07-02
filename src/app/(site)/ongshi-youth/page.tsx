import type { Metadata } from "next";

import { YouthIntro } from "@/components/youth/YouthIntro";
import { YouthJoinCta } from "@/components/youth/YouthJoinCta";
import { getYouthPageData } from "@/lib/sanity/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getYouthPageData();

  return {
    title: page?.seo?.metaTitle ?? "Ongshi Youth",
    description:
      page?.seo?.metaDescription ??
      page?.intro ??
      "Youth-led service projects with Ongshi in Austin and beyond.",
  };
}

export default async function OngshiYouthPage() {
  const page = await getYouthPageData();

  return (
    <>
      {page ? <YouthIntro {...page} /> : null}
      {page ? (
        <YouthJoinCta
          joinHeadline={page.joinHeadline}
          joinText={page.joinText}
          joinFormUrl={page.joinFormUrl}
        />
      ) : null}
    </>
  );
}
