import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/public";
import type { Profile } from "@/types";

type ProfileRow = {
  name: string;
  first_name: string;
  last_name: string;
  initials: string;
  role: string;
  discipline: string;
  location: string;
  timezone: string;
  email: string;
  photo_home: string;
  photo_lanyard: string;
  available: string;
  intro: string;
  bio: string[];
  resume_url: string;
  socials: Profile["socials"];
};

function mapProfile(row: ProfileRow): Profile {
  return {
    name: row.name,
    firstName: row.first_name,
    lastName: row.last_name,
    initials: row.initials,
    role: row.role,
    discipline: row.discipline,
    location: row.location,
    timezone: row.timezone,
    email: row.email,
    photoHome: row.photo_home,
    photoLanyard: row.photo_lanyard,
    available: row.available,
    intro: row.intro,
    bio: row.bio,
    resumeUrl: row.resume_url,
    socials: row.socials,
  };
}

export const getProfile = cache(async (): Promise<Profile> => {
  const { data, error } = await supabasePublic
    .from("profile")
    .select("*")
    .eq("id", "default")
    .single();

  if (error || !data) {
    throw new Error(`Failed to load profile: ${error?.message ?? "not found"}`);
  }

  return mapProfile(data as ProfileRow);
});
