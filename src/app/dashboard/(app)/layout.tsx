import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";
import { ghostButtonClass } from "@/components/dashboard/styles";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/dashboard", label: "Ringkasan" },
  { href: "/dashboard/profile", label: "Profil" },
  { href: "/dashboard/projects", label: "Proyek" },
  { href: "/dashboard/experience", label: "Pengalaman" },
  { href: "/dashboard/certifications", label: "Sertifikasi" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Belt-and-suspenders: middleware already gates every /dashboard request,
  // but this makes the layout safe on its own if that ever changes.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dashboard/login");

  return (
    <div className="bg-ink text-paper min-h-dvh">
      <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row">
        <aside className="border-line/60 shrink-0 border-b px-6 py-8 md:w-56 md:border-r md:border-b-0 md:py-10">
          <Link href="/dashboard" className="font-display text-xl">
            Dashboard
          </Link>
          <nav className="mt-8 flex flex-row flex-wrap gap-x-6 gap-y-2 md:mt-10 md:flex-col md:gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-mute hover:text-paper font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={logout} className="mt-8 md:mt-10">
            <button type="submit" className={ghostButtonClass}>
              Keluar
            </button>
          </form>
        </aside>
        <main className="min-w-0 flex-1 px-6 py-10 md:px-10">{children}</main>
      </div>
    </div>
  );
}
