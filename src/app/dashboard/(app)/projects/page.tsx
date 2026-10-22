import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { buttonClass, ghostButtonClass } from "@/components/dashboard/styles";
import { deleteProject } from "./actions";

export default async function DashboardProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("slug, title, category, sort_order, featured")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="font-display text-3xl">Proyek</p>
        <Link href="/dashboard/projects/new" className={buttonClass}>
          Proyek baru
        </Link>
      </div>

      <div className="border-line/70 mt-10 border-t">
        {(projects ?? []).map((project) => (
          <div
            key={project.slug}
            className="border-line/70 flex items-center justify-between gap-6 border-b py-5"
          >
            <div className="min-w-0">
              <p className="font-display truncate text-lg">{project.title}</p>
              <p className="text-mute font-mono text-xs tracking-[0.08em]">
                {project.slug} · urutan {project.sort_order}
                {project.featured ? " · unggulan" : ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <Link href={`/dashboard/projects/${project.slug}/edit`} className={ghostButtonClass}>
                Ubah
              </Link>
              <DeleteButton action={deleteProject.bind(null, project.slug)} />
            </div>
          </div>
        ))}
        {(projects ?? []).length === 0 ? (
          <p className="text-mute py-8 text-sm">Belum ada proyek.</p>
        ) : null}
      </div>
    </div>
  );
}
