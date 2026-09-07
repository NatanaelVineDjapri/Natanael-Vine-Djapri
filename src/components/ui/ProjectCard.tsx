import Image from "next/image";
import Link from "next/link";
import TechBadge from "./TechBadge";
import CoverPlaceholder from "./CoverPlaceholder";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group border-line/70 flex flex-col border-t pt-8"
    >
      <div className="border-line bg-ink-2 relative aspect-[16/10] w-full overflow-hidden border">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <CoverPlaceholder />
        )}
      </div>

      <div className="mt-7 flex items-baseline justify-between gap-4">
        <h3 className="font-display group-hover:text-mute-2 text-3xl leading-none transition-colors duration-500">
          {project.title}
        </h3>
        <span className="text-mute shrink-0 font-mono text-[0.625rem] tracking-[0.2em]">
          {project.year}
        </span>
      </div>

      <p className="text-mute mt-3 font-mono text-[0.625rem] tracking-[0.18em] uppercase">
        {project.category} / {project.role}
      </p>

      <p className="text-mute-2 mt-5 text-sm leading-relaxed text-balance-pretty">
        {project.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((item) => (
          <TechBadge key={item} name={item} />
        ))}
      </div>
    </Link>
  );
}
