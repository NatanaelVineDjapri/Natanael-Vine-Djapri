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
    category: "Computer-Based Testing Platform (CBT)",
    year: "2026",
    role: "Lead Fullstack Developer",
    summary:
      "CBT Akademis AI is a Computer-Based Test system designed to assist universities in managing digital examination processes. The system features automated grading and basic AI-based analysis to help lecturers evaluate student performance more efficiently and in a structured manner.",
    description: [
      "CBT Akademis AI is a centralized digital examination platform designed to streamline the entire examination process, from question creation and exam scheduling to participant management, grading, and result reporting. The platform is built to provide a secure, scalable, and efficient digital examination experience for both administrators and participants.",

      "The system features AI-powered question generation, real-time exam monitoring, automatic grading for objective questions, manual essay evaluation, and real-time communication using WebSockets. It also integrates with academic and learning systems to streamline exam management and the handling of examination results across platforms.",
    ],
    stack: ["Laravel", "Next.js", "PostgreSQL", "Python", "WebSocket"],
    contributions: [
      "Developed and deployed a full-stack CBT platform using Laravel and Next.js.",
      "Implemented RESTful APIs, AI-powered proctoring services, PostgreSQL integration, and real-time WebSocket communication.",
      "Led end-to-end system development, including frontend, backend, deployment, environment configuration, and system integration.",
    ],
    cover: "/images/projects/meridian.svg",
    featured: true,
  },
  {
    slug: "rajawali-plastik-digihub",
    index: "02",
    title: "Rajawali Plastik",
    category: "Operational Digital Platform",
    year: "2025",
    role: "Fullstack Developer",
    summary:
      "DigiHub platform that streamlines inventory, sales, and distribution processes within a single integrated system.",
    description: [
      "DigiHub is a digital platform built to simplify inventory, sales, and distribution management at Rajawali Plastik.",
      "Core business modules were designed and integrated to improve operational efficiency and data accessibility, with Laravel on the backend and Next.js on the frontend.",
    ],
    stack: ["Laravel", "Next.js", "MySQL"],
    contributions: [
      "Built a digital platform to streamline inventory, sales, and distribution processes.",
      "Designed and integrated core business modules for operational efficiency and data accessibility.",
      "Oversaw frontend development, backend integration, and deployment throughout the project lifecycle.",
    ],
    cover: "/images/projects/lumen.svg",
    featured: true,
  },
  {
    slug: "eggsplore-marketplace",
    index: "03",
    title: "Eggsplore",
    category: "Mobile Marketplace",
    year: "2025",
    role: "Mobile Developer",
    summary:
      "Mobile marketplace app with authentication, product management, a shopping cart, and a virtual balance system.",
    description: [
      "Eggsplore is a mobile marketplace app inspired by modern e-commerce platforms, focused on an interactive and easy-to-use shopping experience.",
      "Core e-commerce functionality was built end-to-end: user authentication, product management, shopping cart, and a virtual balance system, with a RESTful API bridging the app to backend services.",
    ],
    stack: ["Flutter", "Dart", "Laravel", "MySQL"],
    contributions: [
      "Developed a mobile marketplace app with an interactive shopping experience.",
      "Implemented user authentication, product management, shopping cart, and digital wallet features.",
      "Integrated a RESTful API for seamless communication between the mobile app and backend.",
    ],
    cover: "/images/projects/vantage.svg",
    featured: true,
  },
  {
    slug: "pingy",
    index: "04",
    title: "Pingy",
    category: "Social Media Backend",
    year: "2025",
    role: "Backend Developer",
    summary:
      "A Twitter/X-style backend project built on Laravel 11 as a social media architecture exercise.",
    description: [
      "Pingy is a backend project built with the Laravel 11 framework, inspired by the Twitter/X social media platform.",
      "The focus was on designing data relationships, the authentication flow, and timeline rendering, with Blade and JavaScript for the view layer.",
    ],
    stack: ["Laravel 11", "Blade", "JavaScript", "MySQL"],
    contributions: [
      "Designed the database schema and relationships between social media entities.",
      "Built the authentication flow along with core posting and user interaction operations.",
      "Built the view layer using Blade and JavaScript.",
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
      "A clone of the TheCocktailDB REST API, built as the midterm exam for the Backend Programming course.",
    description: [
      "This project was the midterm exam for the Backend Programming course, which required building a REST API based on an existing public API.",
      "TheCocktailDB was used as the reference public API, and the implementation was built with Node.js and Express.js.",
    ],
    stack: ["Node.js", "Express.js"],
    contributions: [
      "Designed the endpoint structure following the reference API's contract.",
      "Implemented routing, controllers, and error handling with Express.js.",
      "Tested API responses against different request scenarios.",
    ],
    cover: "/images/projects/obsidian.svg",
    repoUrl: "https://github.com/NatanaelVineDjapri/Cocktails_API",
    featured: false,
  },
  {
    slug: "cod-mobile-website",
    index: "06",
    title: "Call of Duty Mobile",
    category: "Static Website",
    year: "2024",
    role: "Frontend Developer",
    summary:
      "A Call of Duty Mobile-themed static website, built as an early exercise in layout and styling with pure HTML and CSS.",
    description: [
      "This site was an early frontend exercise: building a Call of Duty Mobile-themed page layout using only HTML and CSS, without any framework.",
      "The exercise focused on clean document structure, visual hierarchy, and manually arranging components.",
    ],
    stack: ["HTML", "CSS"],
    contributions: [
      "Built the page structure and visual hierarchy from scratch.",
      "Arranged components and basic responsiveness using pure CSS.",
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
