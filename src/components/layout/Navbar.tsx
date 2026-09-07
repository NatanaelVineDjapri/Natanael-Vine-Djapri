"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Container from "./Container";
import { navItems } from "@/data/site";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("beranda");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the section closest to the top third of the viewport wins
  useEffect(() => {
    if (!onHome) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const lenis = useLenis();
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  // Lenis owns the scroll position, so the browser's native anchor jump has to
  // be handed over to it or the page would teleport instead of gliding.
  const goTo = (event: React.MouseEvent, id: string) => {
    setOpen(false);
    if (!onHome || !lenis) return;
    event.preventDefault();
    // -90 clears the floating pill's own height plus its top gap, so the
    // section title doesn't land tucked underneath it.
    lenis.scrollTo(`#${id}`, { offset: -90, duration: 1.35 });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      {/* Floating pill, off the edge on every side rather than a full-width
          bar. Stays off-white/light regardless of scroll so it reads as an
          elegant object sitting on top of the dark page. */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
        <div
          className={cn(
            "bg-paper/95 mx-auto flex h-16 max-w-[1080px] items-center justify-between rounded-full border border-black/5 pr-2 pl-5 shadow-[0_16px_36px_-18px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-shadow duration-700 sm:pr-2.5 sm:pl-6",
            scrolled && "shadow-[0_22px_48px_-16px_rgba(0,0,0,0.8)]",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="bg-ink text-paper flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-[0.6rem] tracking-[0.06em]">
              {profile.initials.slice(0, 2)}
            </span>
            <span className="font-display text-ink hidden text-lg leading-none sm:inline">
              {profile.firstName}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={href(item.id)}
                onClick={(event) => goTo(event, item.id)}
                className={cn(
                  "relative font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-500",
                  onHome && active === item.id
                    ? "text-ink"
                    : "text-ink/45 hover:text-ink",
                )}
              >
                {item.label}
                {onHome && active === item.id ? (
                  <motion.span
                    layoutId="nav-active"
                    className="bg-ink absolute -bottom-2 left-0 h-px w-full"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              className="bg-ink text-paper hidden items-center rounded-full px-4 py-2.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-transform duration-500 hover:scale-[1.04] md:inline-flex"
            >
              Download CV
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 3.5, width: 18 } : { rotate: 0, y: 0, width: 18 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-ink block h-px"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3.5, width: 18 } : { rotate: 0, y: 0, width: 12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-ink block h-px"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="bg-ink fixed inset-0 z-40 overflow-y-auto lg:hidden"
          >
            {/* min-h-full + justify-center centres a short list but lets a tall
                one grow and scroll, instead of clipping it out of reach. */}
            <Container className="flex min-h-full flex-col justify-center gap-1 py-24">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={href(item.id)}
                  onClick={(event) => goTo(event, item.id)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.18 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-line/60 group flex items-baseline gap-5 border-b py-3.5 sm:py-4"
                >
                  <span className="text-mute font-mono text-[0.625rem] tracking-[0.2em]">
                    {item.index}
                  </span>
                  <span className="font-display group-hover:text-mute-2 text-3xl transition-colors duration-500 sm:text-4xl">
                    {item.label}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href={profile.resumeUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="text-mute mt-10 font-mono text-[0.6875rem] tracking-[0.2em] uppercase"
              >
                Download CV
              </motion.a>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
