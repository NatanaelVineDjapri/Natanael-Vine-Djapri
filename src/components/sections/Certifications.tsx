"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import CoverPlaceholder from "@/components/ui/CoverPlaceholder";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/types";

const GROUP_ORDER = ["Learning", "Volunteering", "Award"];

function CertificationCard({
  certification,
  onOpen,
}: {
  certification: Certification;
  onOpen: () => void;
}) {
  const body = (
    <>
      <div className="border-line bg-ink-2 relative aspect-[4/3] w-full overflow-hidden border">
        {certification.image ? (
          <>
            <Image
              src={certification.image}
              alt={`Certificate: ${certification.title}`}
              fill
              unoptimized
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="object-contain transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <span className="bg-ink/75 text-paper absolute right-0 bottom-0 px-3 py-2 font-mono text-[0.5625rem] tracking-[0.2em] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              View full
            </span>
          </>
        ) : (
          <CoverPlaceholder />
        )}
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <span className="text-mute font-mono text-[0.625rem] tracking-[0.2em] uppercase">
          {certification.category}
        </span>
        <span className="text-mute font-mono text-[0.625rem] tracking-[0.2em]">
          {certification.year}
        </span>
      </div>

      <h3 className="font-display text-paper group-hover:text-mute-2 mt-4 text-2xl leading-tight transition-colors duration-500">
        {certification.title}
      </h3>

      <p className="text-mute mt-2 font-mono text-[0.625rem] tracking-[0.14em] uppercase">
        {certification.issuer}
      </p>

      {certification.credentialId ? (
        <p className="text-mute mt-1 font-mono text-[0.625rem] tracking-[0.08em]">
          ID: {certification.credentialId}
        </p>
      ) : null}

      <p className="text-mute-2 mt-4 text-sm leading-relaxed text-balance-pretty">
        {certification.description}
      </p>
    </>
  );

  if (certification.image) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="group border-line/70 flex w-full flex-col border-t pt-7 text-left"
      >
        {body}
      </button>
    );
  }

  if (certification.url) {
    return (
      <a
        href={certification.url}
        target="_blank"
        rel="noreferrer"
        className="group border-line/70 flex w-full flex-col border-t pt-7 text-left"
      >
        {body}
      </a>
    );
  }

  return (
    <div className="group border-line/70 flex w-full flex-col border-t pt-7 text-left">
      {body}
    </div>
  );
}

export default function Certifications() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = certifications.find((item) => item.id === openId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const groups = GROUP_ORDER.map((group) => ({
    group,
    items: certifications.filter((item) => item.category === group),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="sertifikasi" className="border-line/60 border-t py-28 md:py-40">
      <Container>
        <SectionHeading
          index="05"
          label="Certifications"
          title="Certificates and awards."
          description="A collection of certificates from courses, volunteer roles, and awards. Click one to see the full version."
        />

        <div className="mt-20 space-y-20">
          {groups.map((group) => (
            <div key={group.group}>
              <p className="eyebrow border-line/70 border-b pb-4">
                {group.group} ({group.items.length})
              </p>
              <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((certification, index) => (
                  <Reveal key={certification.id} delay={(index % 3) * 0.08}>
                    <CertificationCard
                      certification={certification}
                      onOpen={() => setOpenId(certification.id)}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpenId(null)}
            className="bg-ink/94 fixed inset-0 z-[90] flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-full w-full max-w-3xl overflow-auto"
            >
              <div className="border-line bg-ink-2 relative aspect-[4/3] max-h-[78vh] w-full border">
                {active.image ? (
                  <Image
                    src={active.image}
                    alt={`Certificate: ${active.title}`}
                    fill
                    unoptimized
                    sizes="90vw"
                    className="object-contain"
                  />
                ) : (
                  <CoverPlaceholder />
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-display text-paper text-2xl">{active.title}</p>
                  <p className="text-mute mt-1 font-mono text-[0.625rem] tracking-[0.16em] uppercase">
                    {active.issuer} / {active.year}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="text-mute hover:text-paper font-mono text-[0.625rem] tracking-[0.2em] uppercase transition-colors duration-500"
                >
                  Close (Esc)
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
