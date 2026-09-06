import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Project Archive",
  description:
    "A collection of interface engineering and digital product projects by Natanael Vine Djapri.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-[72px]">
      <Container className="py-24 md:py-32">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Archive</span>
          <span className="eyebrow">{projects.length} projects</span>
        </div>

        <h1 className="mt-10 text-[clamp(2.75rem,8vw,7rem)] leading-[0.95]">
          <TextReveal as="span" text="All" className="block" />
          <TextReveal
            as="span"
            text="projects."
            className="text-mute-2 block italic"
            delay={0.08}
          />
        </h1>

        <Reveal delay={0.2}>
          <p className="text-mute-2 border-line/70 mt-12 max-w-xl border-t pt-6 leading-relaxed text-balance-pretty">
            A complete archive of everything I&apos;ve built — full-stack platforms,
            mobile apps, backend services, and early frontend exercises.
          </p>
        </Reveal>

        <div className="mt-24 grid gap-x-10 gap-y-20 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
