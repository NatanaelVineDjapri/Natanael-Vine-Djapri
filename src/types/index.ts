export type Social = {
  label: string;
  handle: string;
  url: string;
};

export type NavItem = {
  id: string;
  label: string;
  index: string;
};

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  discipline: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  /** Shown in the About section portrait frame. */
  photoHome: string;
  /** Shown on the 3D lanyard badge, kept in full color (not grayscale). */
  photoLanyard: string;
  available: string;
  intro: string;
  bio: string[];
  resumeUrl: string;
  socials: Social[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  description: string[];
  stack: string[];
  contributions: string[];
  /** Omit when there's no real screenshot yet — renders a "Not Available" placeholder instead. */
  cover?: string;
  /** Extra photos for the detail-page gallery. Falls back to just `cover` when omitted. */
  gallery?: string[];
  /** The link slots every project card shows — left unset shows as "-". */
  webUrl?: string;
  youtubeUrl?: string;
  repoUrl?: string;
  docsUrl?: string;
  featured: boolean;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  /** One of "Learning", "Volunteering", or "Award" — used to group the section. */
  category: string;
  /** Omit for credentials with no scanned certificate (e.g. LinkedIn Learning badges) — renders a placeholder instead. */
  image?: string;
  credentialId?: string;
  description: string;
  url?: string;
};

export type ExperienceItem = {
  id: string;
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
};

export type ExpertiseGroup = {
  id: string;
  title: string;
  description: string;
  items: string[];
};
