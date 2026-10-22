import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/public";
import type { Project } from "@/types";

type ProjectRow = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  description: string[];
  stack: string[];
  contributions: string[];
  cover: string | null;
  gallery: string[] | null;
  web_url: string | null;
  youtube_url: string | null;
  repo_url: string | null;
  docs_url: string | null;
  featured: boolean;
};

function mapProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    index: row.index,
    title: row.title,
    category: row.category,
    year: row.year,
    role: row.role,
    summary: row.summary,
    description: row.description,
    stack: row.stack,
    contributions: row.contributions,
    cover: row.cover ?? undefined,
    gallery: row.gallery ?? undefined,
    webUrl: row.web_url ?? undefined,
    youtubeUrl: row.youtube_url ?? undefined,
    repoUrl: row.repo_url ?? undefined,
    docsUrl: row.docs_url ?? undefined,
    featured: row.featured,
  };
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const { data, error } = await supabasePublic
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load projects: ${error.message}`);
  return (data as ProjectRow[]).map(mapProject);
});

export const getProject = cache(async (slug: string): Promise<Project | undefined> => {
  const { data, error } = await supabasePublic
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to load project "${slug}": ${error.message}`);
  return data ? mapProject(data as ProjectRow) : undefined;
});
