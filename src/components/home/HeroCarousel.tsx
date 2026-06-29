"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { HeroSlide } from "@/lib/fallbacks/home";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [statVisible, setStatVisible] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function go(next: number) {
    if (next === indexRef.current) return;
    setStatVisible(false);
    window.setTimeout(() => {
      indexRef.current = next;
      setIndex(next);
      setStatVisible(true);
    }, 220);
  }

  function next() {
    go((indexRef.current + 1) % slides.length);
  }

  function play() {
    if (reduceMotionRef.current) return;
    stop();
    timerRef.current = setInterval(next, 4500);
  }

  function reset() {
    stop();
    play();
  }

  useEffect(() => {
    play();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const active = slides[index];

  return (
    <figure
      className="relative order-first mx-auto max-w-[460px] lg:order-none lg:mx-0 lg:max-w-none"
      onMouseEnter={stop}
      onMouseLeave={play}
    >
      <div className="relative aspect-[1/1.05] overflow-hidden rounded-[20px] shadow-[0_26px_60px_-22px_rgba(20,40,20,0.5)]">
        {slides.map((slide, slideIndex) => (
          <Image
            key={`${slide.imageUrl}-${slideIndex}`}
            src={slide.imageUrl}
            alt={slide.imageAlt}
            fill
            className={`object-cover transition-opacity duration-[900ms] motion-reduce:transition-none ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 880px) 460px, 50vw"
            priority={slideIndex === 0}
          />
        ))}
      </div>

      <div
        className="absolute bottom-7 left-0 flex max-w-[240px] items-center gap-3.5 rounded-2xl bg-white px-5 py-4 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.28)] transition-opacity duration-200 sm:-left-5"
        style={{ opacity: statVisible ? 1 : 0 }}
      >
        <span className="font-display text-[2.1rem] font-bold leading-none text-green-deep whitespace-nowrap">
          {active.statValue}
        </span>
        <span className="text-[0.82rem] leading-snug text-muted">{active.statLabel}</span>
      </div>

      <div
        className="absolute bottom-3.5 right-4 flex gap-1.5"
        role="tablist"
        aria-label="Hero images"
      >
        {slides.map((slide, slideIndex) => (
          <button
            key={`dot-${slide.imageUrl}-${slideIndex}`}
            type="button"
            role="tab"
            aria-selected={slideIndex === index}
            aria-label={`Show image ${slideIndex + 1}`}
            className={`h-2 rounded-full border-none p-0 transition-all duration-200 ${
              slideIndex === index
                ? "w-[22px] rounded-[5px] bg-white"
                : "w-2 bg-white/55"
            }`}
            onClick={() => {
              go(slideIndex);
              reset();
            }}
          />
        ))}
      </div>
    </figure>
  );
}
