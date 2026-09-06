import type { Profile } from "@/types";

/**
 * Sourced from the CV (Sept 2026) and natanaelportofolio.vercel.app.
 * The LinkedIn profile blocks automated reads, so anything unique to it still
 * needs to be added by hand.
 */
export const profile: Profile = {
  name: "Natanael Vine Djapri",
  firstName: "Natanael",
  lastName: "Vine Djapri",
  initials: "NVD",
  role: "Fullstack Developer",
  discipline: "Informatics Engineering, Tarumanagara University",
  location: "Jakarta, Indonesia",
  timezone: "GMT+7",
  email: "natanaelvinedj@gmail.com",
  phone: "+62 813-8799-8816",
  // Two different photos and two different treatments: the About section
  // zooms in tight on the face from a wide meeting-room shot and
  // desaturates it, the lanyard badge shows a separate photo fully
  // uncropped in color. profile.jpg (the old CV thumbnail) was only
  // 144x192px and looked pixelated at any real size.
  photoHome: "/images/PIC2.jpeg",
  photoLanyard: "/images/PIC2.jpeg",
  available: "Open To Internship & Entry Level Jobs",
  intro:
    "Motivated second-year Informatics Engineering student at Tarumanagara University with strong problem-solving, critical thinking, and communication skills, passionate about technology and continuous learning.",

    
  bio: [
    "My name is Natanael Vine Djapri, an undergraduate Informatics Engineering student at Tarumanagara University. I have a strong interest in software development, and artificial intelligence, especially in developing practical digital solutions for real-world problems.",

    "My experience comes mainly from academic and personal projects, where I have worked on full-stack applications, educational technology, and business digitalization. I particularly enjoy developing practical applications while exploring how AI can be integrated to create smarter and more useful solutions.",

    "I’m always looking to improve my technical skills and learn new technologies. My goal is to grow as a software engineer and contribute to projects that create meaningful and practical solutions",
  ],
  resumeUrl: "/resume/natanael-vine-djapri-cv.pdf",
  socials: [
    {
      label: "GitHub",
      handle: "NatanaelVineDjapri",
      url: "https://github.com/NatanaelVineDjapri",
    },
    {
      label: "LinkedIn",
      handle: "natanael-vine-djapri",
      url: "https://www.linkedin.com/in/natanael-vine-djapri-595800344/",
    },
    {
      label: "Instagram",
      handle: "natanaellvd",
      url: "https://www.instagram.com/natanaellvd/",
    },
    {
      label: "WhatsApp",
      handle: "+62 813-8799-8816",
      url: "https://wa.me/6281387998816",
    },
    {
      label: "Email",
      handle: "natanaelvinedj@gmail.com",
      url: "mailto:natanaelvinedj@gmail.com",
    },
  ],
};
