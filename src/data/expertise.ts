import type { ExpertiseGroup } from "@/types";

/** Mirrors the "Skills & Relevant Coursework" block of the CV. */
export const expertise: ExpertiseGroup[] = [
  {
    id: "software",
    title: "Software Engineering",
    description:
      "Building fullstack web applications, from designing REST APIs and databases to the interfaces end users interact with.",
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
      "Processing data and building models, including a computer-vision-based proctoring service for the CBT Akademis AI project.",
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
      "Sharpened through a role as a quality assurance office assistant and two student organizations that demanded cross-team coordination.",
    items: [
      "Adaptability",
      "Communication",
      "Responsibility",
      "Critical Thinking",
      "Collaboration",
      "Flexibility",
    ],
  },
];

/** Relevant coursework, shown as a secondary list under Skills. */
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
