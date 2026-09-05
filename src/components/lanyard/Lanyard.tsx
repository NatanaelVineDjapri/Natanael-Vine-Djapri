"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * WebGL, physics and the GLB together are far too heavy to ship with the first
 * paint, and none of it can render on the server. The scene is code-split and
 * only mounted once the hero is actually on screen.
 */
const LanyardScene = dynamic(() => import("./LanyardScene"), {
  ssr: false,
  loading: () => <Placeholder />,
});

function Placeholder() {
  return (
    <div className="flex h-full w-full items-start justify-center pt-24">
      <div className="border-line/70 h-64 w-44 animate-pulse rounded-sm border" />
    </div>
  );
}

export default function Lanyard() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-[460px] w-full sm:h-[560px] lg:h-[680px]"
      aria-hidden="true"
    >
      {inView ? <LanyardScene /> : <Placeholder />}
    </div>
  );
}
