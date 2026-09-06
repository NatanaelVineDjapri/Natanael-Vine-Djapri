import type { Certification } from "@/types";

/**
 * Mirrors the "Licenses & certifications" section of LinkedIn, split into
 * three groups: Learning (course/badge credentials), Volunteering
 * (organizational roles), and Award (competition/committee recognitions).
 *
 * LinkedIn blocks automated reads, so these are entered by hand from
 * screenshots — send more and they'll be added here the same way.
 */
export const certifications: Certification[] = [
  {
    id: "cert-data-fundamentals",
    title: "Data Fundamentals",
    issuer: "IBM",
    year: "2026",
    category: "Learning",
    credentialId: "c3b778fe-a5cc-45ab-86b0-73fcf1efccd2",
    description: "IBM digital credential covering the fundamentals of working with data.",
  },
  {
    id: "cert-volunteer-01",
    title: "Staff of Advocation & Legislation",
    issuer: "Dewan Perwakilan Mahasiswa FTI UNTAR",
    year: "2025",
    category: "Volunteering",
    image: "/images/certificates/organization-01.svg",
    description:
      "For the role of Staff of Advocation & Legislation, from December 2024 to June 2025.",
  },
  {
    id: "cert-volunteer-02",
    title: "Head of Spiritual Affairs Division",
    issuer: "Student Council (OSIS)",
    year: "2023",
    category: "Volunteering",
    image: "/images/certificates/organization-02.svg",
    description:
      "For the role of Head of the Spiritual Affairs Division, from November 2021 to September 2023.",
  },
];
