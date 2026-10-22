import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ExperienceForm } from "../../ExperienceForm";
import { updateExperience } from "../../actions";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!item) notFound();

  return (
    <div>
      <p className="font-display text-3xl">Ubah pengalaman</p>
      <ExperienceForm item={item} action={updateExperience.bind(null, item.id)} />
    </div>
  );
}
