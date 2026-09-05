import { redirect } from "next/navigation";

/**
 * The profile lives as a section on the single-page home route. This stub keeps
 * the older /about URL alive instead of leaving a second, divergent copy.
 */
export default function AboutPage() {
  redirect("/#tentang");
}
