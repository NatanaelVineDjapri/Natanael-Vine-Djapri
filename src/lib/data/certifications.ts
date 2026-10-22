import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/public";
import type { Certification } from "@/types";

type CertificationRow = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  image: string | null;
  credential_id: string | null;
  description: string;
  url: string | null;
};

function mapCertification(row: CertificationRow): Certification {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    year: row.year,
    category: row.category,
    image: row.image ?? undefined,
    credentialId: row.credential_id ?? undefined,
    description: row.description,
    url: row.url ?? undefined,
  };
}

export const getCertifications = cache(async (): Promise<Certification[]> => {
  const { data, error } = await supabasePublic
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load certifications: ${error.message}`);
  return (data as CertificationRow[]).map(mapCertification);
});
