import type { ExperienceItem } from "@/types";

/**
 * Work, education and organisational history, taken from the CV.
 * Kept as a single list sorted oldest to newest — no separate tracks per type.
 */
export const experience: ExperienceItem[] = [
  {
    id: "exp-high-school",
    period: "2021 - 2024",
    role: "High School, Science Track",
    org: "Budi Mulia Jakarta",
    location: "Jakarta, Indonesia",
    description: "Completed secondary education in the Science Track.",
  },
  {
    id: "exp-03",
    period: "Nov 2021 - Sep 2023",
    role: "Head of Spiritual Affairs Division, OSIS",
    org: "Student Council",
    location: "Jakarta, Indonesia",
    description:
      "Organized spiritual activities such as prayer fellowships and religious holiday celebrations, designed and distributed digital content themed around religious values, and encouraged students to apply those values in daily life.",
  },
  {
    id: "exp-04",
    period: "2024 - 2028 (target)",
    role: "B.S. in Informatics Engineering, Faculty of Information Technology",
    org: "Universitas Tarumanagara",
    location: "Jakarta, Indonesia",
    description:
      "Undergraduate program in Informatics Engineering with a cumulative GPA of 3.98 out of 4.00. Relevant coursework includes Data Structures and Algorithms, Database Systems, Software Engineering, Big Data, Distributed Systems, Machine Learning, and Artificial Intelligence.",
  },
  {
    id: "exp-02",
    period: "Dec 2024 - Jun 2025",
    role: "Staff of Advocation & Legislation",
    org: "Dewan Perwakilan Mahasiswa FTI UNTAR",
    location: "Jakarta, Indonesia",
    description:
      "Received, documented, stored, and returned lost-and-found items while helping identify their owners, and carried out work programs based on responsibilities assigned to new members.",
  },
  {
    id: "exp-01",
    period: "Mar 2025 - Present",
    role: "Student Assistant, Quality Assurance and Audit Office",
    org: "Universitas Tarumanagara",
    location: "Jakarta, Indonesia",
    description:
      "Drafted and formatted SPMI (internal quality assurance) standards at the university and faculty level, managed and updated the office's official website so all quality assurance documents stayed current, and handled other administrative tasks for the Head of Office.",
  },
];
