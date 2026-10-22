"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function paragraphs(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function optionalString(value: FormDataEntryValue | null): string | null {
  const str = String(value ?? "").trim();
  return str.length ? str : null;
}

function projectPayload(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    index: String(formData.get("index") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    description: paragraphs(formData.get("description")),
    stack: lines(formData.get("stack")),
    contributions: lines(formData.get("contributions")),
    cover: optionalString(formData.get("cover")),
    gallery: lines(formData.get("gallery")),
    web_url: optionalString(formData.get("web_url")),
    youtube_url: optionalString(formData.get("youtube_url")),
    repo_url: optionalString(formData.get("repo_url")),
    docs_url: optionalString(formData.get("docs_url")),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

function revalidateProject(slug: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const payload = projectPayload(formData);

  const { error } = await supabase.from("projects").insert(payload);
  if (error) throw new Error(error.message);

  revalidateProject(payload.slug);
  redirect("/dashboard/projects");
}

export async function updateProject(originalSlug: string, formData: FormData) {
  const supabase = await createClient();
  const payload = projectPayload(formData);

  const { error } = await supabase
    .from("projects")
    .update(payload)
    .eq("slug", originalSlug);
  if (error) throw new Error(error.message);

  revalidateProject(originalSlug);
  if (payload.slug !== originalSlug) revalidateProject(payload.slug);
  redirect("/dashboard/projects");
}

export async function deleteProject(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidateProject(slug);
  redirect("/dashboard/projects");
}
