import Image from "next/image";

import { ImpactStrip } from "@/components/home/ImpactStrip";
import { Wrap } from "@/components/ui/Wrap";
import { resolveImageAlt } from "@/lib/imageAlt";
import type { ProgramGalleryImage, ProgramImpactStat } from "@/lib/fallbacks/program";

export function ProgramImpact({
  stats,
  gallery,
}: {
  stats: ProgramImpactStat[];
  gallery: ProgramGalleryImage[];
}) {
  const hasStats = stats.length > 0;
  const hasGallery = gallery.length > 0;

  if (!hasStats && !hasGallery) {
    return null;
  }

  return (
    <section aria-label="Program impact">
      {hasStats ? <ImpactStrip stats={stats} /> : null}

      {hasGallery ? (
        <div className={hasStats ? "border-t border-line" : undefined}>
          <Wrap className="py-14 md:py-20">
            <div
              className={
                gallery.length === 1
                  ? "mx-auto max-w-2xl"
                  : "grid gap-4 md:grid-cols-2"
              }
            >
              {gallery.map((image) => (
                <div
                  key={image.imageUrl}
                  className="relative aspect-[4/3] overflow-hidden rounded-[14px]"
                >
                  <Image
                    src={image.imageUrl}
                    alt={resolveImageAlt(image.imageAlt)}
                    fill
                    className="object-cover"
                    sizes={
                      gallery.length === 1
                        ? "(max-width: 768px) 100vw, 672px"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                  />
                </div>
              ))}
            </div>
          </Wrap>
        </div>
      ) : null}
    </section>
  );
}
