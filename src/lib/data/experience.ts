import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/public";
import type { ExperienceItem } from "@/types";

type ExperienceRow = {
  id: string;
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
};

function mapExperience(row: ExperienceRow): ExperienceItem {
  return {
    id: row.id,
    period: row.period,
    role: row.role,
    org: row.org,
    location: row.location,
    description: row.description,
  };
}

export const getExperience = cache(async (): Promise<ExperienceItem[]> => {
  const { data, error } = await supabasePublic
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load experience: ${error.message}`);
  return (data as ExperienceRow[]).map(mapExperience);
});
