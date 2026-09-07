"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * WebGL, physics and the GLB together are far too heavy to ship with the first
 * paint, and none of it can render on the server. The scene is code-split and
 * only mounted once the hero is actually on screen.
 */
const LanyardScene = dynamic(() => import("./LanyardScene"), {
  ssr: false,
  loading: () => <Placeholder />,
});

/** Below this the badge is dropped entirely — see `Lanyard`. */
const DESKTOP = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

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
  const desktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );

  useEffect(() => {
    if (!desktop) return;
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
  }, [desktop]);

  // Phones get nothing at all: no reserved height, and the three.js/Rapier
  // chunks are never even requested, since the dynamic import only runs when
  // something actually renders the scene.
  if (!desktop) return null;

  return (
    <div ref={ref} className="h-[680px] w-full" aria-hidden="true">
      {inView ? <LanyardScene /> : <Placeholder />}
    </div>
  );
}
