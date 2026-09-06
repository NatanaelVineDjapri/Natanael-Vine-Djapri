import type { IconType } from "react-icons";
import {
  SiCss,
  SiDart,
  SiExpress,
  SiFlutter,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiTypescript,
} from "react-icons/si";

/**
 * Maps a stack/tech name as written in the project data to its brand icon.
 * Matched by substring (case-insensitive) so "Laravel 11" still resolves to
 * the Laravel icon. Anything not listed here (e.g. WebSocket, Blade) just
 * renders as plain text — there's no meaningful brand mark for it.
 */
const techIcons: [match: string, icon: IconType][] = [
  ["next.js", SiNextdotjs],
  ["laravel", SiLaravel],
  ["typescript", SiTypescript],
  ["javascript", SiJavascript],
  ["postgresql", SiPostgresql],
  ["mysql", SiMysql],
  ["python", SiPython],
  ["flutter", SiFlutter],
  ["dart", SiDart],
  ["node.js", SiNodedotjs],
  ["express.js", SiExpress],
  ["php", SiPhp],
  ["html", SiHtml5],
  ["css", SiCss],
];

export function getTechIcon(name: string): IconType | null {
  const lower = name.toLowerCase();
  const found = techIcons.find(([match]) => lower.includes(match));
  return found ? found[1] : null;
}
