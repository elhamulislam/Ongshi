import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getDonateHubPath } from "@/lib/donation";
import { getSiteSettings } from "@/lib/sanity/loaders";
import { SanityLive } from "@/sanity/lib/live";

/** ISR fallback: regenerate CMS-backed pages at most every 60s. Sanity Live also revalidates on publish via cache tags. */
export const revalidate = 60;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const donateUrl = getDonateHubPath();
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <Header donateUrl={donateUrl} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} donateUrl={donateUrl} />
      <SanityLive />
      {isDraftMode ? <VisualEditing /> : null}
    </>
  );
}
