"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { experience } from "@/data/experience";

export default function Experience() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 75%", "end 60%"],
  });
  // The rail draws itself downward as the list scrolls past
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="perjalanan" className="border-line/60 border-t py-28 md:py-40">
      <Container>
        <SectionHeading
          index="06"
          label="Journey"
          title="Track record."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero a pharetra augue mollis."
        />

        <div ref={track} className="relative mt-20 pl-8 md:pl-0">
          {/* Rail */}
          <div className="bg-line/60 absolute top-0 left-0 h-full w-px md:left-[22%]">
            <motion.div
              style={{ scaleY }}
              className="bg-paper/70 h-full w-px origin-top"
            />
          </div>

          <div className="space-y-px">
            {experience.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.07}>
                <article className="border-line/70 relative grid gap-4 border-b py-9 md:grid-cols-[22%_1fr] md:gap-12">
                  <span className="bg-paper absolute top-[42px] -left-8 size-[7px] translate-x-[-3px] rotate-45 md:left-[22%]" />

                  <p className="text-mute font-mono text-[0.6875rem] tracking-[0.16em] uppercase">
                    {item.period}
                  </p>

                  <div className="md:pl-12">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-paper text-2xl leading-tight md:text-3xl">
                        {item.role}
                      </h3>
                      <span className="text-mute-2 font-mono text-xs tracking-[0.1em]">
                        {item.org}
                      </span>
                    </div>

                    <p className="text-mute mt-2 font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                      {item.location}
                    </p>

                    <p className="text-mute-2 mt-5 max-w-xl text-sm leading-relaxed text-balance-pretty">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
