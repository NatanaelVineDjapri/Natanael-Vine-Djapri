import Container from "@/components/layout/Container";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import Lanyard from "@/components/lanyard/Lanyard";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-dvh flex-col overflow-hidden pt-[7px]"
    >
      <Container className="relative flex-1 py-2">
        <div className="grid items-center gap-4 lg:grid-cols-12">
          {/* Type block */}
          <div className="pt-28 lg:col-span-7 lg:pt-24">
            <Reveal y={12}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="eyebrow">Portofolio</span>
                <span className="eyebrow hidden sm:inline">||</span>
                {/* <span className="bg-line h-px w-12" /> */}
                <span className="eyebrow">{profile.available}</span>
              </div>
            </Reveal>

            <h1 className="mt-10 text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.03em]">
              <TextReveal as="span" text="Natanael" className="block" />
              <TextReveal
                as="span"
                text="Vine Djapri"
                className="text-mute-2 block italic"
                delay={0.1}
              />
            </h1>

            <Reveal delay={0.25}>
              <div className="border-line/70 mt-12 max-w-lg border-t pt-6">
                <p className="text-paper-dim text-base leading-relaxed text-balance-pretty">
                  {profile.intro}
                </p>
                <p className="text-mute mt-5 font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
                  {profile.discipline}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Draggable badge, desktop only */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <Lanyard />
            {/* <Reveal delay={0.5}>
              <p className="text-mute pointer-events-none -mt-6 text-center font-mono text-[0.625rem] tracking-[0.22em] uppercase">
                Tarik kartunya
              </p>
            </Reveal> */}
          </div>
        </div>
      </Container>

      {/* Standing details along the bottom edge. Kept in normal flow (not
          absolutely positioned) so it is pushed below the hero content
          instead of overlapping it when the intro text runs long. */}
      <Container className="pb-8">
        <Reveal delay={0.6}>
          <div className="border-line/70 text-mute flex flex-col gap-2 border-t pt-5 font-mono text-[0.625rem] tracking-[0.2em] uppercase sm:flex-row sm:items-center sm:justify-between">
            <span>{profile.location}</span>
            <span className="hidden md:inline">{profile.timezone}</span>
            <span>{profile.role}</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
