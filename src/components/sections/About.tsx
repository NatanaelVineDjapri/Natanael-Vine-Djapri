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
          label="Tentang Saya"
          title="Software Engineer and Artificial Intelligence Enthusiast."
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Parallax strength={26} className="max-w-[300px]">
              <div className="border-line bg-ink-2 group relative aspect-[3/4] w-full overflow-hidden border">
                {/*
                  HOW TO ADJUST THE CROP/ZOOM ON THIS PHOTO
                  ------------------------------------------
                  Two Tailwind classes below control it, both arbitrary values:

                  1. scale-[N]   — zoom level. 1 = no zoom (the photo's normal
                     object-cover fit). Higher = more zoomed in. Try values
                     like 2, 3, 4... and see what frames the face well.

                  2. origin-[X%_Y%] — the point the zoom is centered on, as a
                     percentage of the photo's own width/height (not the box).
                     X% = 0 is the left edge, 100% is the right edge.
                     Y% = 0 is the top edge, 100% is the bottom edge.
                     So origin-[50%_20%] zooms toward the horizontal center,
                     but only 20% of the way down — good for a face near the
                     top of a full-body photo.

                  There's also a hover state (group-hover:scale-[N]) used for
                  a subtle zoom-in-further effect on mouse hover. IMPORTANT:
                  Tailwind's scale utility overrides the base scale rather
                  than multiplying it, so the hover number must be written as
                  the FULL desired hover scale (e.g. base 2.4 -> hover 2.5),
                  not as an extra "on top of" amount.

                  Fastest way to tune this: open the page, find this element
                  in your browser's dev tools, and edit the scale-[...] and
                  origin-[..._...] values live until the framing looks right,
                  then copy those numbers back into this file.
                */}
                {/*
                  unoptimized is required here, not just a nice-to-have:
                  Next.js normally fetches a version of this photo sized to
                  match the ~300px box (via `sizes` below), with no idea that
                  scale-[N] above will then blow it up further with CSS. That
                  mismatch is what was reading as "burem" — a small,
                  already-downscaled image stretched bigger. unoptimized
                  serves the real source file directly instead.
                */}
                <Image
                  src={profile.photoHome}
                  alt={`Foto ${profile.name}`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="origin-[47%_60%] scale-[1.1] object-cover grayscale transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[2] group-hover:grayscale-[0.55]"
                />
                {/* Keeps the caption legible over the lighter part of the photo */}
                {/* <div className="from-ink absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" /> */}
               {/* <div className="text-black absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                  <span>{profile.firstName}</span>
                  <span>UNTAR</span>
                </div> */}
              </div>
            </Parallax>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <div className="space-y-6">
              {profile.bio.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p className="text-paper-dim text-lg leading-[1.75] text-justify text-balance-pretty">
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
