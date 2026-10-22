"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function optionalString(value: FormDataEntryValue | null): string | null {
  const str = String(value ?? "").trim();
  return str.length ? str : null;
}

function certificationPayload(formData: FormData) {
  return {
    id: String(formData.get("id") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    issuer: String(formData.get("issuer") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    image: optionalString(formData.get("image")),
    credential_id: optionalString(formData.get("credential_id")),
    description: String(formData.get("description") ?? "").trim(),
    url: optionalString(formData.get("url")),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createCertification(formData: FormData) {
  const supabase = await createClient();
  const payload = certificationPayload(formData);

  const { error } = await supabase.from("certifications").insert(payload);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/dashboard/certifications");
}

export async function updateCertification(originalId: string, formData: FormData) {
  const supabase = await createClient();
  const payload = certificationPayload(formData);

  const { error } = await supabase
    .from("certifications")
    .update(payload)
    .eq("id", originalId);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/dashboard/certifications");
}

export async function deleteCertification(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("certifications").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/dashboard/certifications");
}
