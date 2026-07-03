"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react";

import { Wrap } from "@/components/ui/Wrap";

export function StoryFooter({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/stories/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User dismissed the share sheet.
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="border-t border-line py-10 md:py-12">
      <Wrap>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 font-semibold text-green-deep hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to stories
          </Link>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-[0.95rem] font-semibold text-ink transition hover:border-green hover:bg-green-tint"
          >
            <Share2 className="h-4 w-4" aria-hidden />
            {copied ? "Link copied" : "Share"}
          </button>
        </div>
      </Wrap>
    </section>
  );
}
