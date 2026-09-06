import Badge from "./Badge";
import { getTechIcon } from "@/lib/tech-icons";

/** Badge for a tech-stack entry, prefixed with its brand icon when one exists. */
export default function TechBadge({ name }: { name: string }) {
  const Icon = getTechIcon(name);

  return (
    <Badge className="gap-1.5">
      {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
      {name}
    </Badge>
  );
}
