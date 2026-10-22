"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function experiencePayload(formData: FormData) {
  return {
    id: String(formData.get("id") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    org: String(formData.get("org") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createExperience(formData: FormData) {
  const supabase = await createClient();
  const payload = experiencePayload(formData);

  const { error } = await supabase.from("experience").insert(payload);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/dashboard/experience");
}

export async function updateExperience(originalId: string, formData: FormData) {
  const supabase = await createClient();
  const payload = experiencePayload(formData);

  const { error } = await supabase.from("experience").update(payload).eq("id", originalId);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/dashboard/experience");
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/dashboard/experience");
}
