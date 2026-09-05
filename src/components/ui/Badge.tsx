import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Hairline chip used for tech stacks and metadata. */
export default function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "border-line text-mute-2 hover:border-mute hover:text-paper inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors duration-500",
        className,
      )}
    >
      {children}
    </span>
  );
}
