"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import { resolveImageAlt } from "@/lib/imageAlt";
import type { GalleryImageData } from "@/lib/sanity/gallery";
import { urlFor } from "@/sanity/lib/image";

const THUMB_WIDTH = 480;
const LIGHTBOX_WIDTH = 1920;
const SWIPE_THRESHOLD = 48;

function getThumbUrl(image: GalleryImageData): string | null {
  return urlFor(image.source)?.width(THUMB_WIDTH).auto("format").url() ?? null;
}

function getLightboxUrl(image: GalleryImageData): string | null {
  return urlFor(image.source)?.width(LIGHTBOX_WIDTH).auto("format").url() ?? null;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

type GalleryLightboxProps = {
  images: GalleryImageData[];
  index: number;
  titleId: string;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

function GalleryLightbox({
  images,
  index,
  titleId,
  onClose,
  onChangeIndex,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const image = images[index];
  const imageAlt = resolveImageAlt(image.alt, image.caption);
  const lightboxUrl = getLightboxUrl(image);

  const goPrev = useCallback(() => {
    onChangeIndex((index - 1 + images.length) % images.length);
  }, [images.length, index, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex((index + 1) % images.length);
  }, [images.length, index, onChangeIndex]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        return;
      }

      if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, onClose]);

  const handleTouchStart = (event: ReactTouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: ReactTouchEvent) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (startX == null || endX == null) {
      return;
    }

    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) {
      return;
    }

    if (delta > 0) {
      goPrev();
    } else {
      goNext();
    }
  };

  const transitionClass = reducedMotion ? "" : "transition-opacity duration-200";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="absolute inset-0 bg-green-ink/80 backdrop-blur-sm"
        aria-label="Close gallery"
        onClick={onClose}
      />

      <div
        className={`relative z-10 flex max-h-[92vh] w-full max-w-[min(1100px,100%)] flex-col ${transitionClass}`}
      >
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <p id={titleId} className="text-sm font-medium text-paper/90">
            {index + 1} / {images.length}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex rounded-full bg-paper/10 p-2 text-paper hover:bg-paper/20"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          {images.length > 1 ? (
            <button
              type="button"
              className="absolute left-0 z-20 -translate-x-1 rounded-full bg-paper/10 p-2 text-paper hover:bg-paper/20 sm:left-2"
              aria-label="Previous image"
              onClick={goPrev}
            >
              <ChevronLeft className="h-7 w-7" aria-hidden />
            </button>
          ) : null}

          <figure className="flex max-h-[calc(92vh-5rem)] w-full flex-col items-center">
            {lightboxUrl ? (
              <Image
                key={image.key}
                src={lightboxUrl}
                alt={imageAlt}
                width={image.width}
                height={image.height}
                sizes="100vw"
                className={`max-h-[calc(92vh-7rem)] w-auto max-w-full rounded-[14px] object-contain ${transitionClass}`}
                priority
              />
            ) : null}
            {image.caption ? (
              <figcaption className="mt-4 max-w-prose text-center text-base leading-relaxed text-paper/90">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>

          {images.length > 1 ? (
            <button
              type="button"
              className="absolute right-0 z-20 translate-x-1 rounded-full bg-paper/10 p-2 text-paper hover:bg-paper/20 sm:right-2"
              aria-label="Next image"
              onClick={goNext}
            >
              <ChevronRight className="h-7 w-7" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function GalleryView({
  title,
  intro,
  images,
}: {
  title: string;
  intro?: string | null;
  images: GalleryImageData[];
}) {
  const titleId = useId();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const handleGridKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  };

  return (
    <>
      <section className="border-b border-line pt-10 pb-12 md:pt-16 md:pb-16">
        <Wrap>
          <div className="max-w-[720px]">
            <Eyebrow>Photos</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-tight tracking-tight text-ink">
              {title}
            </h1>
            {intro ? (
              <p className="mt-5 text-[1.12rem] leading-[1.68] text-muted">{intro}</p>
            ) : null}
          </div>
        </Wrap>
      </section>

      <section className="py-10 md:py-14">
        <Wrap>
          {images.length === 0 ? (
            <div className="rounded-[18px] border border-line bg-green-tint/50 px-6 py-14 text-center">
              <p className="font-display text-2xl font-semibold text-ink">Photos coming soon</p>
              <p className="mx-auto mt-3 max-w-md text-muted">
                We&apos;re gathering images from the field. Check back soon to see Ongshi&apos;s
                work in action.
              </p>
            </div>
          ) : (
            <div
              className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4"
              role="list"
              aria-label="Gallery images"
            >
              {images.map((image, index) => {
                const thumbUrl = getThumbUrl(image);
                const imageAlt = resolveImageAlt(image.alt, image.caption);
                if (!thumbUrl) {
                  return null;
                }

                return (
                  <div key={image.key} role="listitem" className="mb-4 break-inside-avoid">
                    <button
                      type="button"
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-[14px] bg-line text-left shadow-[0_8px_24px_rgba(42,41,38,0.06)] focus-visible:outline-offset-4"
                      aria-label={`View image: ${imageAlt}`}
                      onClick={() => openLightbox(index)}
                      onKeyDown={(event) => handleGridKeyDown(event, index)}
                    >
                      <Image
                        src={thumbUrl}
                        alt={imageAlt}
                        width={image.width}
                        height={image.height}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </Wrap>
      </section>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          titleId={titleId}
          onClose={closeLightbox}
          onChangeIndex={setLightboxIndex}
        />
      ) : null}
    </>
  );
}
