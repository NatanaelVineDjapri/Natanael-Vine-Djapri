"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/**
 * Pulls apart values like "3.98", "100+" and "06": the digits get counted, and
 * the decimal places and any leading zero are read back off the source string
 * so the resting value renders exactly as it was written.
 */
const PATTERN = /^(\D*)(\d+(?:\.\d+)?)(\D*)$/;

// The real value is server-rendered so it survives without JS; zeroing it has
// to happen before paint, or the final number flashes first.
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function CountUp({
  value,
  className,
  duration = 1.4,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  useBeforePaint(() => {
    const node = ref.current;
    const parsed = PATTERN.exec(value);
    if (!node || !parsed) return;

    const [, prefix, digits, suffix] = parsed;
    const [whole, fraction = ""] = digits.split(".");
    const pad = whole.startsWith("0") ? whole.length : 0;

    const format = (n: number) => {
      const [i, d] = n.toFixed(fraction.length).split(".");
      return prefix + i.padStart(pad, "0") + (d ? `.${d}` : "") + suffix;
    };

    if (!inView) {
      node.textContent = format(0);
      return;
    }

    const controls = animate(0, Number(digits), {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });

    return () => controls.stop();
  }, [value, inView, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
