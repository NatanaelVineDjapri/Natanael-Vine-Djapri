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
  discipline: "Teknik Informatika, Universitas Tarumanagara",
  location: "Jakarta, Indonesia",
  timezone: "GMT+7",
  email: "natanaelvinedj@gmail.com",
  phone: "+62 813-8799-8816",
  // Two different photos, on purpose: the About section gets the formal
  // headshot, the lanyard badge gets the gym photo, kept in full color.
  photoHome: "/images/profile.jpg",
  photoLanyard: "/images/PIC1.jpeg",
  available: "Open To Internship & Entry Level Jobs",
  intro:
    "Motivated second-year Informatics Engineering student at Tarumanagara University with strong problem-solving, critical thinking, and communication skills, passionate about technology and continuous learning.",

    
  bio: [
    "Saya mahasiswa tahun kedua Fakultas Teknologi Informasi, jurusan Teknik Informatika di Universitas Tarumanagara, dengan IPK kumulatif 3.98 dari 4.00 dan target kelulusan Agustus 2028.",
    "Sehari-hari saya membangun sistem fullstack: dari REST API dan integrasi basis data di sisi belakang, sampai antarmuka yang rapi di sisi depan. Laravel, Next.js, dan PostgreSQL adalah alat yang paling sering saya pakai.",
    "Di luar kuliah saya bekerja sebagai Student Assistant di Kantor Penjaminan Mutu dan Audit Universitas Tarumanagara, serta aktif di organisasi kemahasiswaan. Kombinasi itu melatih komunikasi, tanggung jawab, dan kolaborasi saya.",
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
