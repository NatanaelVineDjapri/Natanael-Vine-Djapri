import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { buttonClass, ghostButtonClass } from "@/components/dashboard/styles";
import { deleteExperience } from "./actions";

export default async function DashboardExperiencePage() {
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from("experience")
    .select("id, period, role, org, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="font-display text-3xl">Pengalaman</p>
        <Link href="/dashboard/experience/new" className={buttonClass}>
          Entri baru
        </Link>
      </div>

      <div className="border-line/70 mt-10 border-t">
        {(items ?? []).map((item) => (
          <div
            key={item.id}
            className="border-line/70 flex items-center justify-between gap-6 border-b py-5"
          >
            <div className="min-w-0">
              <p className="font-display truncate text-lg">{item.role}</p>
              <p className="text-mute font-mono text-xs tracking-[0.08em]">
                {item.org} · {item.period} · urutan {item.sort_order}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <Link href={`/dashboard/experience/${item.id}/edit`} className={ghostButtonClass}>
                Ubah
              </Link>
              <DeleteButton action={deleteExperience.bind(null, item.id)} />
            </div>
          </div>
        ))}
        {(items ?? []).length === 0 ? (
          <p className="text-mute py-8 text-sm">Belum ada data.</p>
        ) : null}
      </div>
    </div>
  );
}
