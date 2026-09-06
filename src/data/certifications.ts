import type { Certification } from "@/types";

/**
 * The categories below follow the ones already published on
 * natanaelportofolio.vercel.app (programming, school, organization).
 *
 * IMPORTANT: the title, issuer, and year below are still placeholders, and
 * the images are auto-generated SVG plates. Replace the `title`, `issuer`,
 * `year`, and `description` values, then overwrite the files in
 * public/images/certificates/ with scans of the real certificates.
 */
export const certifications: Certification[] = [
  {
    id: "cert-01",
    title: "Programming Certificate",
    issuer: "Not provided yet",
    year: "2025",
    category: "Programming",
    image: "/images/certificates/programming-01.svg",
    description:
      "A certificate in programming. Replace the title, issuer, and image with the real certificate data.",
  },
  {
    id: "cert-02",
    title: "Web Development Certificate",
    issuer: "Not provided yet",
    year: "2025",
    category: "Programming",
    image: "/images/certificates/programming-02.svg",
    description:
      "A certificate in web development. Replace the title, issuer, and image with the real certificate data.",
  },
  {
    id: "cert-03",
    title: "Database Certificate",
    issuer: "Not provided yet",
    year: "2024",
    category: "Programming",
    image: "/images/certificates/programming-03.svg",
    description:
      "A certificate in databases. Replace the title, issuer, and image with the real certificate data.",
  },
  {
    id: "cert-04",
    title: "Organization Award",
    issuer: "Dewan Perwakilan Mahasiswa FTI UNTAR",
    year: "2025",
    category: "Organization",
    image: "/images/certificates/organization-01.svg",
    description:
      "For the role of Staff of Advocation & Legislation, from December 2024 to June 2025.",
  },
  {
    id: "cert-05",
    title: "Committee Award",
    issuer: "Student Council (OSIS)",
    year: "2023",
    category: "Organization",
    image: "/images/certificates/organization-02.svg",
    description:
      "For the role of Head of the Spiritual Affairs Division, from November 2021 to September 2023.",
  },
  {
    id: "cert-06",
    title: "School Certificate",
    issuer: "Not provided yet",
    year: "2023",
    category: "School",
    image: "/images/certificates/school-01.svg",
    description:
      "A certificate from high school. Replace the title, issuer, and image with the real certificate data.",
  },
];
