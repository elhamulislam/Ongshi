import type { Metadata } from "next";

import { OurWorkIntro } from "@/components/our-work/OurWorkIntro";
import { OurWorkPrograms } from "@/components/our-work/OurWorkPrograms";
import { getProgramsIndex } from "@/lib/sanity/loaders";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Ongshi's evergreen programs in health care, relief and rehab, and education — across Bangladesh and Austin, Texas.",
};

export default async function OurWorkPage() {
  const programs = await getProgramsIndex();

  return (
    <>
      <OurWorkIntro />
      <OurWorkPrograms programs={programs} />
    </>
  );
}
