import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import TechBadge from "@/components/ui/TechBadge";
import ProjectGallery from "@/components/ui/ProjectGallery";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} / ${project.category}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(position + 1) % projects.length];

  return (
    <article className="pt-[72px]">
      <Container className="py-24 md:py-32">
        <Reveal y={12}>
          <div className="flex items-center gap-4">
            {/* <span className="eyebrow">{project.index}</span> */}
            {/* <span className="bg-line h-px w-10" /> */}
            <span className="eyebrow">{project.category}</span>
          </div>
        </Reveal>

        <h1 className="mt-10 text-[clamp(3rem,9vw,7.5rem)] leading-[0.94]">
          <TextReveal as="span" text={project.title} className="block" />
        </h1>

        <Reveal delay={0.15}>
          <p className="text-paper-dim border-line/70 mt-12 max-w-2xl border-t pt-6 text-lg leading-relaxed text-balance-pretty">
            {project.summary}
          </p>
        </Reveal>

        <div className="border-line/70 mt-16 grid gap-8 border-t pt-8 sm:grid-cols-3">
          {[
            { label: "Year", value: project.year },
            { label: "Role", value: project.role },
            { label: "Category", value: project.category },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.07}>
              <p className="eyebrow">{item.label}</p>
              <p className="text-paper mt-3 font-mono text-xs tracking-[0.08em]">
                {item.value}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20">
            <ProjectGallery
              images={
                project.gallery?.length
                  ? project.gallery
                  : project.cover
                    ? [project.cover]
                    : []
              }
              alt={project.title}
            />
          </div>
        </Reveal>

        <div className="mt-24 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {project.description.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.07}>
                  <p className="text-paper-dim text-lg leading-[1.75] text-balance-pretty">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="font-display mt-16 text-3xl">Contributions</h2>
              <ul className="mt-8">
                {project.contributions.map((item, index) => (
                  <li
                    key={index}
                    className="border-line/60 text-paper-dim flex gap-6 border-b py-5 text-sm leading-relaxed"
                  >
                    <span className="text-mute shrink-0 font-mono text-[0.625rem] tracking-[0.2em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-balance-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <p className="eyebrow">Tech Stack</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <TechBadge key={item} name={item} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow border-line/70 mt-12 border-t pt-8">Links</p>
              <div className="mt-6 flex flex-col gap-3">
                {[
                  { label: "Website", url: project.webUrl, action: "Visit site" },
                  { label: "YouTube", url: project.youtubeUrl, action: "Watch demo" },
                  { label: "Repository", url: project.repoUrl, action: "Source code" },
                  { label: "Docs", url: project.docsUrl, action: "View docs" },
                ].map((link) => (
                  <div
                    key={link.label}
                    className="flex items-baseline justify-between gap-4 font-mono text-xs tracking-[0.08em]"
                  >
                    <span className="text-mute">{link.label}</span>
                    {link.url ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-paper-dim hover:text-paper link-wipe"
                      >
                        {link.action}
                      </a>
                    ) : (
                      <span className="text-mute">-</span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal>
          <Link
            href={`/projects/${next.slug}`}
            className="group border-line/70 mt-28 flex items-center justify-between gap-6 border-t pt-10"
          >
            <div>
              <p className="eyebrow">Next project</p>
              <p className="font-display group-hover:text-mute-2 mt-4 text-[clamp(2rem,5vw,4rem)] leading-none transition-colors duration-500">
                {next.title}
              </p>
            </div>
            <span className="text-mute group-hover:text-paper shrink-0 transition-all duration-500 group-hover:translate-x-2">
              <svg width="30" height="30" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M4 11h14M12 5l6 6-6 6" stroke="currentColor" strokeWidth="1.1" />
              </svg>
            </span>
          </Link>
        </Reveal>
      </Container>
    </article>
  );
}
