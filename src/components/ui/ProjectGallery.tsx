"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Full-bleed image slider for the project detail page, one photo at a time. */
export default function ProjectGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const go = (delta: number) => {
    setIndex((current) => (current + delta + images.length) % images.length);
  };

  return (
    <div className="border-line bg-ink-2 group relative aspect-[8/5] w-full overflow-hidden border">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={alt}
            fill
            unoptimized
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="bg-ink/60 text-paper hover:bg-ink/85 absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M14 4 6 11l8 7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="bg-ink/60 text-paper hover:bg-ink/85 absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M8 4l8 7-8 7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          <div className="absolute right-0 bottom-4 left-0 flex items-center justify-center gap-2">
            {images.map((_, dot) => (
              <button
                key={dot}
                type="button"
                onClick={() => setIndex(dot)}
                aria-label={`Go to photo ${dot + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dot === index ? "bg-paper w-6" : "bg-paper/40 hover:bg-paper/70 w-1.5"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
