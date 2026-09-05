import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { profile } from "@/data/profile";
import { stats } from "@/data/site";

export default function About() {
  return (
    <section id="tentang" className="py-28 md:py-40">
      <Container>
        <SectionHeading
          index="02"
          label="Tentang"
          title="Membangun antarmuka yang tenang, presisi, dan tahan lama."
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          {/* Held to a modest width: the source photo is only 144px wide, so a
              larger frame would show the upscale. */}
          <div className="lg:col-span-4">
            <Parallax strength={26} className="max-w-[300px]">
              <div className="border-line bg-ink-2 group relative aspect-[3/4] w-full overflow-hidden border">
                <Image
                  src={profile.photoHome}
                  alt={`Foto ${profile.name}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover grayscale transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-[0.55]"
                />
                {/* Keeps the caption legible over the lighter part of the photo */}
                <div className="from-ink absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
                <div className="text-mute-2 absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                  <span>{profile.firstName}</span>
                  <span>UNTAR</span>
                </div>
              </div>
            </Parallax>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6">
              {profile.bio.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p className="text-paper-dim text-lg leading-[1.75] text-balance-pretty">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="border-line/70 mt-16 grid grid-cols-2 gap-y-10 border-t pt-10 md:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.07}>
                  <p className="font-display text-paper text-4xl leading-none">
                    {stat.value}
                  </p>
                  <p className="text-mute mt-3 font-mono text-[0.625rem] tracking-[0.16em] uppercase">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
