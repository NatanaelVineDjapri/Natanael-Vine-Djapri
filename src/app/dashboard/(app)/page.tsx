import Link from "next/link";

const ITEMS = [
  {
    href: "/dashboard/profile",
    label: "Profil",
    desc: "Nama, bio, foto, dan media sosial — satu baris data profil.",
  },
  {
    href: "/dashboard/projects",
    label: "Proyek",
    desc: "Daftar proyek portofolio, galeri, dan tautan.",
  },
  {
    href: "/dashboard/experience",
    label: "Pengalaman",
    desc: "Linimasa riwayat kerja, pendidikan, dan organisasi.",
  },
  {
    href: "/dashboard/certifications",
    label: "Sertifikasi",
    desc: "Kredensial pembelajaran, relawan, dan penghargaan.",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div>
      <p className="font-display text-3xl">Ringkasan</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-line hover:border-mute block border p-6 transition-colors"
          >
            <p className="font-display text-xl">{item.label}</p>
            <p className="text-mute mt-2 text-sm">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
