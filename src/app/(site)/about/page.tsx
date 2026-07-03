import type { Metadata } from "next";

import { AboutImpactTransparency } from "@/components/about/AboutImpactTransparency";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutPartners } from "@/components/about/AboutPartners";
import { AboutTeam } from "@/components/about/AboutTeam";
import {
  getAboutPageData,
  getPartnersWithLogos,
  getTeamMembers,
} from "@/lib/sanity/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPageData();

  return {
    title: page?.seo?.metaTitle ?? "About",
    description:
      page?.seo?.metaDescription ??
      page?.intro ??
      "Learn about Ongshi — a volunteer-driven nonprofit and partner in hope.",
  };
}

export default async function AboutPage() {
  const [page, teamMembers, partners] = await Promise.all([
    getAboutPageData(),
    getTeamMembers(),
    getPartnersWithLogos(),
  ]);

  return (
    <>
      {page ? <AboutIntro {...page} /> : null}
      {page ? (
        <AboutImpactTransparency
          impactStats={page.impactStats}
          transparencyStatement={page.transparencyStatement}
          annualReports={page.annualReports}
        />
      ) : null}
      <AboutTeam members={teamMembers} />
      <AboutPartners partners={partners} />
    </>
  );
}
