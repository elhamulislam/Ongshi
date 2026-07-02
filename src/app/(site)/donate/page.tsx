import type { Metadata } from "next";

import { DonateIntro } from "@/components/donate/DonateIntro";
import { DonateOptions } from "@/components/donate/DonateOptions";
import { getDonatePageData, getSiteSettings } from "@/lib/sanity/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDonatePageData();

  return {
    title: page.seo?.metaTitle ?? "Donate",
    description: page.seo?.metaDescription ?? page.whyGive,
  };
}

export default async function DonatePage() {
  const [page, settings] = await Promise.all([getDonatePageData(), getSiteSettings()]);

  return (
    <>
      <DonateIntro headline={page.headline} whyGive={page.whyGive} />
      <DonateOptions donation={settings.donation} />
    </>
  );
}
