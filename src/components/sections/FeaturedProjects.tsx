"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function FeaturedProjects() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="karya" className="py-28 md:py-40">
      <Container>
        <SectionHeading
          index="04"
          label="PROJECTS"
          title="Things I’ve built."
          description="A collection of projects I’ve worked on while exploring software engineering, artificial intelligence, and different technologies."
        />

        <div onMouseLeave={() => setHovered(null)} className="relative mt-20">
          <div className="border-line/70 border-t">
            {projects.map((project, index) => (
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
              View full archive
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
