import type { ExpertiseGroup } from "@/types";

/** Mirrors the "Skills & Relevant Coursework" block of the CV. */
export const expertise: ExpertiseGroup[] = [
  {
    id: "software",
    title: "Software Engineering",
    description:
      "Membangun aplikasi web fullstack, dari perancangan REST API dan basis data sampai antarmuka yang dipakai pengguna akhir.",
    items: [
      "TypeScript",
      "JavaScript",
      "PHP",
      "Laravel",
      "Next.js",
      "Node.js",
      "Express.js",
      "Flutter",
      "PostgreSQL",
      "MySQL",
      "RESTful API",
      "Git",
    ],
  },
  {
    id: "ai-data",
    title: "AI & Data",
    description:
      "Mengolah data dan membangun model, termasuk layanan proctoring berbasis computer vision pada proyek CBT Akademis AI.",
    items: [
      "Python",
      "NumPy",
      "Pandas",
      "OpenCV",
      "Scikit-learn",
      "TensorFlow",
      "MATLAB",
    ],
  },
  {
    id: "interpersonal",
    title: "Interpersonal",
    description:
      "Diasah lewat peran asisten kantor penjaminan mutu dan dua organisasi kemahasiswaan yang menuntut koordinasi lintas pihak.",
    items: [
      "Adaptability",
      "Komunikasi",
      "Tanggung jawab",
      "Berpikir kritis",
      "Kolaborasi",
      "Fleksibilitas",
    ],
  },
];

/** Relevant coursework, shown as a secondary list under Keahlian. */
export const coursework: string[] = [
  "Data Structures & Algorithms",
  "Database Systems",
  "Object-Oriented Programming",
  "Software Engineering",
  "Big Data",
  "Operating Systems",
  "Numerical Methods",
  "Distributed Systems",
  "Machine Learning",
  "Artificial Intelligence",
];
