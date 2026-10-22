"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function paragraphs(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const socials = Array.from({ length: 6 }, (_, i) => ({
    label: String(formData.get(`social_label_${i}`) ?? "").trim(),
    handle: String(formData.get(`social_handle_${i}`) ?? "").trim(),
    url: String(formData.get(`social_url_${i}`) ?? "").trim(),
  })).filter((social) => social.label && social.url);

  const { error } = await supabase
    .from("profile")
    .update({
      name: formData.get("name"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      initials: formData.get("initials"),
      role: formData.get("role"),
      discipline: formData.get("discipline"),
      location: formData.get("location"),
      timezone: formData.get("timezone"),
      email: formData.get("email"),
      logo: formData.get("logo"),
      photo_home: formData.get("photo_home"),
      photo_lanyard: formData.get("photo_lanyard"),
      available: formData.get("available"),
      intro: formData.get("intro"),
      bio: paragraphs(formData.get("bio")),
      resume_url: formData.get("resume_url"),
      socials,
    })
    .eq("id", "default");

  if (error) throw new Error(error.message);

  // Profile feeds the root layout's metadata, Navbar, Footer, and every
  // section — bust the whole tree, not just one route.
  revalidatePath("/", "layout");
  redirect("/dashboard/profile");
}
