import type { Project } from "@/types";

/**
 * Projects taken from the CV and from natanaelportofolio.vercel.app.
 * Live URLs are only filled in where a public link is actually known.
 */
export const projects: Project[] = [
  {
    slug: "cbt-akademis-ai",
    index: "01",
    title: "CBT Akademis AI",
    category: "Platform Ujian Berbasis Komputer",
    year: "2026",
    role: "Lead Fullstack Developer",
    summary:
      "Platform Computer-Based Test untuk institusi pendidikan, lengkap dengan layanan proctoring berbasis AI dan komunikasi realtime.",
    description: [
      "CBT Akademis AI adalah platform ujian berbasis komputer yang dibangun dan di-deploy penuh untuk institusi pendidikan. Sisi belakang memakai Laravel, sementara antarmuka peserta dan pengawas dibangun dengan Next.js.",
      "Sistem ini menggabungkan RESTful API, layanan proctoring berbasis AI, integrasi PostgreSQL, dan komunikasi WebSocket realtime supaya status peserta ujian dapat dipantau saat itu juga.",
    ],
    stack: ["Laravel", "Next.js", "PostgreSQL", "Python", "WebSocket"],
    contributions: [
      "Mengembangkan dan men-deploy platform CBT fullstack memakai Laravel dan Next.js.",
      "Mengimplementasikan RESTful API, layanan proctoring AI, integrasi PostgreSQL, dan komunikasi WebSocket realtime.",
      "Memimpin pengembangan sistem end-to-end: frontend, backend, deployment, konfigurasi environment, dan integrasi sistem.",
    ],
    cover: "/images/projects/meridian.svg",
    featured: true,
  },
  {
    slug: "rajawali-plastik-digihub",
    index: "02",
    title: "Rajawali Plastik",
    category: "Platform Digital Operasional",
    year: "2025",
    role: "Fullstack Developer",
    summary:
      "Platform DigiHub untuk merapikan proses inventori, penjualan, dan distribusi dalam satu sistem terpadu.",
    description: [
      "DigiHub adalah platform digital yang dibangun untuk menyederhanakan pengelolaan inventori, penjualan, dan distribusi pada Rajawali Plastik.",
      "Modul-modul bisnis inti dirancang dan diintegrasikan agar efisiensi operasional dan keterjangkauan data meningkat, dengan Laravel di sisi belakang dan Next.js di sisi depan.",
    ],
    stack: ["Laravel", "Next.js", "MySQL"],
    contributions: [
      "Membangun platform digital untuk merapikan proses inventori, penjualan, dan distribusi.",
      "Merancang dan mengintegrasikan modul bisnis inti untuk efisiensi operasional dan aksesibilitas data.",
      "Mengawal pengembangan frontend, integrasi backend, dan deployment sepanjang siklus proyek.",
    ],
    cover: "/images/projects/lumen.svg",
    featured: true,
  },
  {
    slug: "eggsplore-marketplace",
    index: "03",
    title: "Eggsplore",
    category: "Marketplace Mobile",
    year: "2025",
    role: "Mobile Developer",
    summary:
      "Aplikasi marketplace mobile dengan autentikasi, manajemen produk, keranjang belanja, dan dompet digital.",
    description: [
      "Eggsplore adalah aplikasi marketplace mobile yang mengambil inspirasi dari platform e-commerce modern, dengan fokus pada pengalaman belanja yang interaktif dan mudah dipakai.",
      "Fungsi e-commerce inti dibangun lengkap: autentikasi pengguna, manajemen produk, keranjang belanja, sampai fitur dompet digital, dengan RESTful API sebagai jembatan ke layanan backend.",
    ],
    stack: ["Flutter", "Dart", "Laravel", "MySQL"],
    contributions: [
      "Mengembangkan aplikasi marketplace mobile dengan pengalaman belanja yang interaktif.",
      "Mengimplementasikan autentikasi pengguna, manajemen produk, keranjang belanja, dan dompet digital.",
      "Mengintegrasikan RESTful API agar komunikasi aplikasi mobile dan backend berjalan mulus.",
    ],
    cover: "/images/projects/vantage.svg",
    featured: true,
  },
  {
    slug: "pingy",
    index: "04",
    title: "Pingy",
    category: "Backend Media Sosial",
    year: "2025",
    role: "Backend Developer",
    summary:
      "Proyek backend bergaya Twitter/X yang dibangun di atas Laravel 11 sebagai latihan arsitektur media sosial.",
    description: [
      "Pingy adalah proyek backend yang dibangun memakai framework Laravel 11 dan mengambil inspirasi dari platform media sosial Twitter/X.",
      "Fokusnya ada pada perancangan relasi data, alur autentikasi, dan penyajian linimasa, dengan Blade dan JavaScript untuk lapisan tampilannya.",
    ],
    stack: ["Laravel 11", "Blade", "JavaScript", "MySQL"],
    contributions: [
      "Merancang skema basis data dan relasi antar entitas media sosial.",
      "Membangun alur autentikasi serta operasi inti posting dan interaksi pengguna.",
      "Menyusun lapisan tampilan memakai Blade dan JavaScript.",
    ],
    cover: "/images/projects/halcyon.svg",
    repoUrl: "https://github.com/NatanaelVineDjapri/Pingy",
    featured: true,
  },
  {
    slug: "thecocktail-api-clone",
    index: "05",
    title: "Cocktails API",
    category: "REST API",
    year: "2025",
    role: "Backend Developer",
    summary:
      "Tiruan REST API TheCocktailDB yang dikerjakan sebagai Ujian Tengah Semester mata kuliah Pemrograman Backend.",
    description: [
      "Proyek ini adalah Ujian Tengah Semester mata kuliah Pemrograman Backend, dengan syarat membangun sebuah REST API berdasarkan API publik yang sudah ada.",
      "API publik yang dijadikan acuan adalah TheCocktailDB, dan implementasinya dibangun memakai Node.js dengan Express.js.",
    ],
    stack: ["Node.js", "Express.js"],
    contributions: [
      "Merancang struktur endpoint yang mengikuti kontrak API acuan.",
      "Mengimplementasikan routing, controller, dan penanganan error memakai Express.js.",
      "Menguji respons API terhadap skenario permintaan yang berbeda.",
    ],
    cover: "/images/projects/obsidian.svg",
    repoUrl: "https://github.com/NatanaelVineDjapri/Cocktails_API",
    featured: false,
  },
  {
    slug: "cod-mobile-website",
    index: "06",
    title: "Call of Duty Mobile",
    category: "Situs Statis",
    year: "2024",
    role: "Frontend Developer",
    summary:
      "Situs statis bertema Call of Duty Mobile, dikerjakan sebagai latihan awal tata letak dan styling murni HTML dan CSS.",
    description: [
      "Situs ini adalah latihan frontend awal: menyusun tata letak halaman bertema Call of Duty Mobile hanya dengan HTML dan CSS, tanpa framework.",
      "Fokus latihannya ada pada struktur dokumen yang rapi, hierarki visual, dan penataan komponen secara manual.",
    ],
    stack: ["HTML", "CSS"],
    contributions: [
      "Menyusun struktur halaman dan hierarki visual dari nol.",
      "Menata komponen dan responsivitas dasar memakai CSS murni.",
    ],
    cover: "/images/projects/atlas.svg",
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
