"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

/**
 * Word-by-word mask reveal: each word sits in an overflow-hidden span and
 * slides up from behind its own baseline. The staple of editorial headlines.
 */
export default function TextReveal({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  once = true,
}: TextRevealProps) {
  const words = text.split(" ");
  // Memoised: motion.create() returns a new component type on every call, which
  // would remount the subtree and restart the animation on each render.
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          // pb/-mb cancel each other out for layout, but the padding still
          // pushes the overflow-hidden clip edge down, giving descenders
          // (the tails on j, p, y, g — especially in italic type) room to
          // show instead of getting cut off by a tight parent line-height.
          className="mr-[0.26em] -mb-[0.22em] inline-block overflow-hidden pb-[0.22em] align-bottom"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={{
              hidden: { y: "115%", opacity: 0 },
              shown: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
