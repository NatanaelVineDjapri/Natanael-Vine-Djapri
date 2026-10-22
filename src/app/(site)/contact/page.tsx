import { redirect } from "next/navigation";

/** Kept so the older /contact URL still resolves to the contact section. */
export default function ContactPage() {
  redirect("/#kontak");
}
