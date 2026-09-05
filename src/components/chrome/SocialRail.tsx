import { profile } from "@/data/profile";

/**
 * Fixed vertical rail of social links along the right edge, desktop only —
 * there isn't room for it once the layout drops to a single column. Labels
 * run bottom-to-top, the common reading direction for this kind of side rail,
 * with a hairline stem anchoring the stack to the page edge.
 */
export default function SocialRail() {
  return (
    <aside className="pointer-events-none fixed inset-y-0 right-5 z-40 hidden lg:flex xl:right-8">
      <div className="pointer-events-auto m-auto flex flex-col items-center gap-8">
        <ul className="flex flex-col items-center gap-8">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noreferrer" : undefined}
                className="text-mute hover:text-paper block font-mono text-[0.625rem] tracking-[0.2em] uppercase transition-all duration-500 hover:-translate-y-1"
              >
                <span className="[writing-mode:vertical-rl] rotate-180">
                  {social.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <span className="bg-line h-16 w-px" />
      </div>
    </aside>
  );
}
