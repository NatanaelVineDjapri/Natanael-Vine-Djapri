import type { Certification } from "@/types";

/**
 * The categories below follow the ones already published on
 * natanaelportofolio.vercel.app (programming, sekolah, organisasi).
 *
 * PENTING: judul, penerbit, dan tahun di bawah ini masih placeholder, dan
 * gambarnya adalah plat SVG yang dibuat otomatis. Ganti nilai `title`,
 * `issuer`, `year`, `description`, lalu timpa berkas di
 * public/images/certificates/ dengan pindaian sertifikat aslinya.
 */
export const certifications: Certification[] = [
  {
    id: "cert-01",
    title: "Sertifikat Pemrograman",
    issuer: "Belum diisi",
    year: "2025",
    category: "Programming",
    image: "/images/certificates/programming-01.svg",
    description:
      "Sertifikat bidang pemrograman. Ganti judul, penerbit, dan gambarnya dengan data sertifikat asli.",
  },
  {
    id: "cert-02",
    title: "Sertifikat Pengembangan Web",
    issuer: "Belum diisi",
    year: "2025",
    category: "Programming",
    image: "/images/certificates/programming-02.svg",
    description:
      "Sertifikat bidang pengembangan web. Ganti judul, penerbit, dan gambarnya dengan data sertifikat asli.",
  },
  {
    id: "cert-03",
    title: "Sertifikat Basis Data",
    issuer: "Belum diisi",
    year: "2024",
    category: "Programming",
    image: "/images/certificates/programming-03.svg",
    description:
      "Sertifikat bidang basis data. Ganti judul, penerbit, dan gambarnya dengan data sertifikat asli.",
  },
  {
    id: "cert-04",
    title: "Penghargaan Organisasi",
    issuer: "Dewan Perwakilan Mahasiswa FTI UNTAR",
    year: "2025",
    category: "Organisasi",
    image: "/images/certificates/organization-01.svg",
    description:
      "Berkaitan dengan peran sebagai Staff of Advocation & Legislation periode Desember 2024 sampai Juni 2025.",
  },
  {
    id: "cert-05",
    title: "Penghargaan Kepanitiaan",
    issuer: "Student Council (OSIS)",
    year: "2023",
    category: "Organisasi",
    image: "/images/certificates/organization-02.svg",
    description:
      "Berkaitan dengan peran sebagai Ketua Divisi Kerohanian periode November 2021 sampai September 2023.",
  },
  {
    id: "cert-06",
    title: "Sertifikat Sekolah",
    issuer: "Belum diisi",
    year: "2023",
    category: "Sekolah",
    image: "/images/certificates/school-01.svg",
    description:
      "Sertifikat masa sekolah menengah. Ganti judul, penerbit, dan gambarnya dengan data sertifikat asli.",
  },
];
