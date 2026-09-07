"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import CoverPlaceholder from "./CoverPlaceholder";

// % of container width taken by the active slide. A phone has no room to spare
// for the peeking neighbours, so they shrink to a sliver there.
const SLIDE_WIDE = 60;
const SLIDE_NARROW = 86;
const GAP = 2; // % gap between slides

/**
 * Coverflow-style slider for the project detail page: the active photo sits
 * centered and full-height, with the previous/next photos peeking in at the
 * edges (dimmed, faded into the background) as a hint that there's more.
 */
export default function ProjectGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState(SLIDE_WIDE);
  const hasMultiple = images.length > 1;
  const length = images.length;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const apply = () => setSlide(query.matches ? SLIDE_WIDE : SLIDE_NARROW);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  if (length === 0) {
    return (
      <div className="border-line aspect-[16/9] w-full overflow-hidden border">
        <CoverPlaceholder />
      </div>
    );
  }

  const go = (delta: number) => {
    setIndex((current) => (current + delta + length) % length);
  };

  // Clone the last photo before the first and the first photo after the
  // last, so there's always something peeking on both sides — even at the
  // very start or end of the set, instead of a blank edge.
  const slides = hasMultiple ? [images[length - 1], ...images, images[0]] : images;
  const displayIndex = hasMultiple ? index + 1 : 0;

  return (
    <div className="group relative">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `translateX(calc(50% - ${displayIndex * (slide + GAP) + slide / 2}%))`,
          }}
        >
          {slides.map((src, position) => {
            const isActive = position === displayIndex;
            const goTo = () => {
              if (position === 0) setIndex(length - 1);
              else if (position === slides.length - 1) setIndex(0);
              else setIndex(position - 1);
            };
            return (
              <div
                key={`${src}-${position}`}
                onClick={() => !isActive && goTo()}
                style={{ width: `${slide}%`, marginRight: `${GAP}%` }}
                className={cn(
                  "border-line bg-ink-2 relative aspect-[16/9] shrink-0 overflow-hidden border transition-opacity duration-500",
                  isActive ? "opacity-100" : "cursor-pointer opacity-65 hover:opacity-90",
                )}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority={position === displayIndex}
                  sizes="(min-width: 768px) 60vw, 86vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* A thin vignette at the very edge, not a heavy fade — the peeking
            photos should still read clearly, not look cropped away. */}
        <div className="from-ink pointer-events-none absolute inset-y-0 left-0 z-10 w-[3%] bg-gradient-to-r to-transparent" />
        <div className="from-ink pointer-events-none absolute inset-y-0 right-0 z-10 w-[3%] bg-gradient-to-l to-transparent" />
      </div>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="bg-ink/60 text-paper hover:bg-ink/85 absolute top-1/2 left-2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full opacity-100 backdrop-blur-sm transition-opacity duration-300 md:left-[8%] md:opacity-0 md:group-hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M14 4 6 11l8 7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="bg-ink/60 text-paper hover:bg-ink/85 absolute top-1/2 right-2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full opacity-100 backdrop-blur-sm transition-opacity duration-300 md:right-[8%] md:opacity-0 md:group-hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M8 4l8 7-8 7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          {images.length <= 12 ? (
            <div className="mt-5 flex items-center justify-center gap-2">
              {images.map((_, dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => setIndex(dot)}
                  aria-label={`Go to photo ${dot + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    dot === index ? "bg-paper w-6" : "bg-paper/30 hover:bg-paper/60 w-1.5",
                  )}
                />
              ))}
            </div>
          ) : (
            <p className="text-mute mt-5 text-center font-mono text-[0.6875rem] tracking-[0.2em]">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          )}
        </>
      ) : null}
    </div>
  );
}
