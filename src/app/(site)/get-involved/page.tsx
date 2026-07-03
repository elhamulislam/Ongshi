import type { Metadata } from "next";

import { GetInvolvedIntro } from "@/components/get-involved/GetInvolvedIntro";
import { GetInvolvedNewsletter } from "@/components/get-involved/GetInvolvedNewsletter";
import { GetInvolvedVolunteer } from "@/components/get-involved/GetInvolvedVolunteer";
import { getGetInvolvedPageData, getSiteSettings } from "@/lib/sanity/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGetInvolvedPageData();

  return {
    title: page?.seo?.metaTitle ?? "Get Involved",
    description:
      page?.seo?.metaDescription ??
      page?.intro ??
      "Volunteer, partner, or stay connected with Ongshi.",
  };
}

export default async function GetInvolvedPage() {
  const [page, settings] = await Promise.all([getGetInvolvedPageData(), getSiteSettings()]);
  const newsletterEmbed = settings.newsletter?.newsletterEmbed;

  return (
    <>
      {page ? <GetInvolvedIntro {...page} /> : null}
      {page ? (
        <GetInvolvedVolunteer
          volunteerHeadline={page.volunteerHeadline}
          volunteerText={page.volunteerText}
          volunteerFormUrl={page.volunteerFormUrl}
        />
      ) : null}
      {page ? (
        <GetInvolvedNewsletter
          headline={page.newsletterHeadline}
          text={page.newsletterText}
          newsletterEmbed={newsletterEmbed}
        />
      ) : null}
    </>
  );
}
