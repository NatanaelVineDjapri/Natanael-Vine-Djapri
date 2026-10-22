"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasMultiple = images.length > 1;
  const length = images.length;
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + length) % length);
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, length]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const apply = () => setSlide(query.matches ? SLIDE_WIDE : SLIDE_NARROW);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // Keep the active thumbnail scrolled into view when the slide changes,
  // whether that came from clicking a thumbnail or the prev/next arrows.
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

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
                onClick={() => (isActive ? setLightboxOpen(true) : goTo())}
                style={{ width: `${slide}%`, marginRight: `${GAP}%` }}
                className={cn(
                  "border-line bg-ink-2 group/slide relative aspect-[16/9] shrink-0 cursor-pointer overflow-hidden border transition-opacity duration-500",
                  isActive ? "opacity-100" : "opacity-65 hover:opacity-90",
                )}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority={position === displayIndex}
                  sizes="(min-width: 768px) 60vw, 86vw"
                  className="object-contain"
                />
                {isActive ? (
                  <span className="bg-ink/75 text-paper absolute right-0 bottom-0 z-20 px-3 py-2 font-mono text-[0.5625rem] tracking-[0.2em] uppercase opacity-0 transition-opacity duration-500 group-hover/slide:opacity-100">
                    View full
                  </span>
                ) : null}
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
            className="bg-ink/60 text-paper hover:bg-ink/85 absolute top-1/2 left-2 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full opacity-100 backdrop-blur-sm transition-opacity duration-300 md:left-[8%] md:opacity-0 md:group-hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M14 4 6 11l8 7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="bg-ink/60 text-paper hover:bg-ink/85 absolute top-1/2 right-2 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full opacity-100 backdrop-blur-sm transition-opacity duration-300 md:right-[8%] md:opacity-0 md:group-hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M8 4l8 7-8 7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          <div className="mt-5">
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-4">
              {images.map((src, thumb) => (
                <button
                  key={`${src}-${thumb}`}
                  ref={(el) => {
                    thumbRefs.current[thumb] = el;
                  }}
                  type="button"
                  onClick={() => setIndex(thumb)}
                  aria-label={`Go to photo ${thumb + 1}`}
                  className={cn(
                    "border-line bg-ink-2 relative aspect-[16/9] w-16 shrink-0 cursor-pointer overflow-hidden border transition-all duration-300",
                    thumb === index
                      ? "border-paper opacity-100"
                      : "opacity-40 hover:opacity-75",
                  )}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
            <p className="text-mute mt-3 text-center font-mono text-[0.6875rem] tracking-[0.2em]">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          </div>
        </>
      ) : null}

      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setLightboxOpen(false)}
            className="bg-ink/94 fixed inset-0 z-[90] flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-full w-full max-w-5xl"
            >
              <div className="border-line bg-ink-2 relative aspect-[16/9] max-h-[82vh] w-full border">
                <Image
                  src={images[index]}
                  alt={alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>

              {hasMultiple ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="bg-ink/60 text-paper hover:bg-ink/85 absolute top-1/2 left-2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm md:-left-14"
                  >
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M14 4 6 11l8 7" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="bg-ink/60 text-paper hover:bg-ink/85 absolute top-1/2 right-2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm md:-right-14"
                  >
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M8 4l8 7-8 7" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </>
              ) : null}

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-mute font-mono text-[0.6875rem] tracking-[0.2em]">
                  {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </p>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="text-mute hover:text-paper cursor-pointer font-mono text-[0.625rem] tracking-[0.2em] uppercase transition-colors duration-500"
                >
                  Close (Esc)
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
