import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12", className)}>
      <div className="lg:col-span-4">
        <Reveal>
          <div className="flex items-center gap-4">
            {/* <span className="eyebrow">{index}</span> */}
            {/* <span className="bg-line h-px w-10" /> */}
            <span className="eyebrow">{label}</span>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-8">
        <TextReveal
          as="h2"
          text={title}
          className="text-paper text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.02]"
        />
        {description ? (
          <Reveal delay={0.12}>
            <p className="text-mute-2 mt-7 max-w-xl text-base leading-relaxed text-balance-pretty">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
