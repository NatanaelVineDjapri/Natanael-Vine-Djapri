"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { getFeaturedProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

const featured = getFeaturedProjects();

export default function FeaturedProjects() {
  const [hovered, setHovered] = useState<string | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const previewX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const previewY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  const onMove = (event: React.MouseEvent) => {
    const bounds = wrapper.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  };

  const active = featured.find((project) => project.slug === hovered);

  return (
    <section id="karya" className="py-28 md:py-40">
      <Container>
        <SectionHeading
          index="04"
          label="Karya"
          title="Pilihan proyek."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus."
        />

        <div
          ref={wrapper}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
          className="relative mt-20"
        >
          {/* Cursor-tracked preview, desktop only */}
          <motion.div
            aria-hidden="true"
            style={{ x: previewX, y: previewY }}
            animate={{
              opacity: active ? 1 : 0,
              scale: active ? 1 : 0.86,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block"
          >
            <div className="border-line bg-ink-2 relative -ml-40 -translate-y-1/2 overflow-hidden border">
              {active ? (
                <Image
                  src={active.cover}
                  alt=""
                  width={320}
                  height={220}
                  unoptimized
                  className="h-[220px] w-[320px] object-cover"
                />
              ) : null}
            </div>
          </motion.div>

          <div className="border-line/70 border-t">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <Link
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setHovered(project.slug)}
                  className="group border-line/70 relative flex items-center gap-6 border-b py-8 md:py-11"
                >
                  <span className="text-mute w-10 shrink-0 font-mono text-[0.625rem] tracking-[0.2em]">
                    {project.index}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        "flex flex-col gap-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:flex-row md:items-baseline md:gap-6",
                        "group-hover:translate-x-3",
                      )}
                    >
                      <h3
                        className={cn(
                          "font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-none transition-colors duration-500",
                          hovered && hovered !== project.slug
                            ? "text-mute/55"
                            : "text-paper",
                        )}
                      >
                        {project.title}
                      </h3>
                      <span className="text-mute font-mono text-[0.6875rem] tracking-[0.16em] uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-mute hidden shrink-0 font-mono text-[0.6875rem] tracking-[0.16em] sm:block">
                    {project.year}
                  </span>

                  <span className="text-mute group-hover:text-paper shrink-0 transition-all duration-500 group-hover:translate-x-1">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 17L17 5M17 5H8M17 5v9"
                        stroke="currentColor"
                        strokeWidth="1.1"
                      />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-end">
            <Link
              href="/projects"
              className="text-mute hover:text-paper link-wipe font-mono text-[0.6875rem] tracking-[0.2em] uppercase transition-colors duration-500"
            >
              Lihat seluruh arsip
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
