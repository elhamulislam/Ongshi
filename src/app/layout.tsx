import { Fraunces, Inter } from "next/font/google";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getDonateUrl } from "@/lib/donation";
import { getSiteSettings } from "@/lib/sanity/loaders";
import { SanityLive } from "@/sanity/lib/live";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ongshi — Partner in Hope",
  description:
    "Ongshi is a community of volunteers restoring sight, rebuilding homes, and sponsoring children across Bangladesh and Austin, Texas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const donateUrl = getDonateUrl(settings.donation);
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-[17px] leading-[1.62] text-ink antialiased">
        <Header donateUrl={donateUrl} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} donateUrl={donateUrl} />
        <SanityLive />
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
