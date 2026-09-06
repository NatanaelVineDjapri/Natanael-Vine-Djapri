import { cn } from "@/lib/utils";

/** Plain dark placeholder shown wherever a project has no real screenshot yet. */
export default function CoverPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-ink-2 text-mute flex h-full w-full items-center justify-center font-mono text-[0.6875rem] tracking-[0.2em] uppercase",
        className,
      )}
    >
      Not Available
    </div>
  );
}
