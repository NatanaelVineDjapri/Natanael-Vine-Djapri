import Container from "@/components/layout/Container";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="kontak" className="border-line/60 border-t py-28 md:py-40">
      <Container>
        <div className="flex items-center gap-4">
          <span className="eyebrow">07</span>
          <span className="bg-line h-px w-10" />
          <span className="eyebrow">Kontak</span>
        </div>

        <h2 className="mt-12 text-[clamp(2.5rem,7vw,6rem)] leading-[1.0]">
          <TextReveal as="span" text="Mari bicara" className="block" />
          <TextReveal
            as="span"
            text="soal proyek Anda."
            className="text-mute-2 block italic"
            delay={0.08}
          />
        </h2>

        <Reveal delay={0.2}>
          <a
            href={`mailto:${profile.email}`}
            className="group border-line/70 mt-16 flex items-center justify-between gap-6 border-y py-8"
          >
            <span className="font-display group-hover:text-mute-2 text-[clamp(1.25rem,3.2vw,2.5rem)] break-all transition-colors duration-500">
              {profile.email}
            </span>
            <span className="text-mute group-hover:text-paper shrink-0 transition-all duration-500 group-hover:translate-x-2">
              <svg width="30" height="30" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M4 11h14M12 5l6 6-6 6" stroke="currentColor" strokeWidth="1.1" />
              </svg>
            </span>
          </a>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          <Reveal>
            <p className="eyebrow">Tautan</p>
            <ul className="mt-5 space-y-3">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-paper-dim hover:text-paper link-wipe font-mono text-xs tracking-[0.08em] transition-colors duration-500"
                  >
                    {social.label}
                    <span className="text-mute ml-3">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="eyebrow">Berbasis di</p>
            <p className="text-paper-dim mt-5 font-mono text-xs tracking-[0.08em]">
              {profile.location}
            </p>
            <p className="text-mute mt-2 font-mono text-xs tracking-[0.08em]">
              {profile.timezone}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="eyebrow">Berkas</p>
            <a
              href={profile.resumeUrl}
              className="text-paper-dim hover:text-paper link-wipe mt-5 inline-block font-mono text-xs tracking-[0.08em] transition-colors duration-500"
            >
              Curriculum Vitae (PDF)
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
