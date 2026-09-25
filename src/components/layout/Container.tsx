import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Extra right-side padding from lg up reserves a gutter for the fixed
        // SocialRail (see chrome/SocialRail.tsx): it sits ~44-56px from the
        // viewport edge, which used to fall inside the container's content
        // area at laptop widths and swallow clicks on right-aligned CTAs
        // (the Contact email arrow, project-list arrows, etc.).
        "mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:pr-16 xl:pr-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
