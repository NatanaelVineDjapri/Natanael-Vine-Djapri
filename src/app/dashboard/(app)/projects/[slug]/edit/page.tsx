import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "../../ProjectForm";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!project) notFound();

  return (
    <div>
      <p className="font-display text-3xl">Ubah proyek</p>
      <ProjectForm project={project} action={updateProject.bind(null, project.slug)} />
    </div>
  );
}
