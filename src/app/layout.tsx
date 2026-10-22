import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { getProfile } from "@/lib/data/profile";
import "./globals.css";

const sans = Geist({
  variable: "--ff-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--ff-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();

  return {
    title: {
      default: `${profile.name} / ${profile.role}`,
      template: `%s / ${profile.name}`,
    },
    description: profile.intro,
    keywords: [profile.name, "portofolio", "software engineer", "frontend", "web developer"],
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      title: `${profile.name} / ${profile.role}`,
      description: profile.intro,
      siteName: profile.name,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

/**
 * True root — shared by both the public site (./(site)) and the dashboard
 * (./dashboard). Keep this to html/body/fonts only; site-only chrome
 * (Navbar, Footer, grain/cursor effects) lives in (site)/layout.tsx so the
 * dashboard never inherits it.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-paper min-h-dvh">{children}</body>
    </html>
  );
}
