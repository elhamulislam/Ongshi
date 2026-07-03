import Image from "next/image";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import type { EventGalleryImage } from "@/lib/sanity/events";

export function EventGallery({ gallery }: { gallery?: EventGalleryImage[] }) {
  const images = gallery?.filter((image) => image.imageUrl) ?? [];

  if (!images.length) {
    return null;
  }

  return (
    <section className="border-b border-line py-14 md:py-20">
      <Wrap>
        <div className="mb-10 max-w-[640px]">
          <Eyebrow>Photos</Eyebrow>
        </div>
        <div
          className={
            images.length === 1 ? "mx-auto max-w-2xl" : "grid gap-4 md:grid-cols-2"
          }
        >
          {images.map((image) => (
            <div
              key={image.imageUrl}
              className="relative aspect-[4/3] overflow-hidden rounded-[14px]"
            >
              <Image
                src={image.imageUrl}
                alt={image.imageAlt || "Event photo"}
                fill
                className="object-cover"
                sizes={
                  images.length === 1
                    ? "(max-width: 768px) 100vw, 672px"
                    : "(max-width: 768px) 100vw, 50vw"
                }
              />
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
