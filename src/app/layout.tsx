import { Fraunces, Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-[17px] leading-[1.62] text-ink antialiased">
        {children}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token": "d9d9f83a411643e68e8419a708878d01"}'
        />
      </body>
    </html>
  );
}
