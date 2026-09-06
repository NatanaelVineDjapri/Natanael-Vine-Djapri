import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import Badge from "@/components/ui/Badge";
import { coursework, expertise } from "@/data/expertise";
import { toolbox } from "@/data/skills";

export default function Skills() {
  return (
    <section id="keahlian" className="border-line/60 border-y py-28 md:py-40">
      <Container>
        <SectionHeading
          index="03"
          label="Skills"
          title="What I Bring."
          description="The technologies, tools, and interpersonal skills I use and continue to develop through my projects, studies, and experience."
        />

        <div className="mt-20 grid gap-px md:grid-cols-3">
          {expertise.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.1}>
              <article className="border-line/70 h-full border-t pt-8 md:pr-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-paper text-3xl">{group.title}</h3>
                  <span className="text-mute font-mono text-[0.625rem] tracking-[0.2em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="text-mute-2 mt-5 text-sm leading-relaxed text-balance-pretty">
                  {/* {group.description} */}
                </p>

                <ul className="mt-8 space-y-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-line/50 text-paper-dim hover:text-paper flex items-center justify-between border-b py-3 font-mono text-xs tracking-[0.08em] transition-colors duration-500"
                    >
                      <span>{item}</span>
                      <span className="bg-mute/50 size-1 rotate-45" />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="border-line/70 mt-20 border-t pt-10">
            <p className="eyebrow">Relevant Coursework</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {coursework.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>

      <div className="border-line/60 mt-24 border-t">
        <Marquee items={toolbox} speed={40} />
      </div>
    </section>
  );
}
