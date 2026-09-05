"use client";

import { motion } from "motion/react";

/**
 * Seamless running band. The track holds two identical copies and translates by
 * exactly -50%, so the loop point is invisible.
 */
export default function Marquee({
  items,
  speed = 34,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden py-6 select-none">
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-mute-2 text-2xl whitespace-nowrap md:text-3xl">
              {item}
            </span>
            <span className="bg-mute/40 size-1 shrink-0 rotate-45" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
