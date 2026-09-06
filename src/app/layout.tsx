import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Grain from "@/components/chrome/Grain";
import Cursor from "@/components/chrome/Cursor";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import SocialRail from "@/components/chrome/SocialRail";
import { profile } from "@/data/profile";
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

export const metadata: Metadata = {
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

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-paper min-h-dvh">
        <Grain />
        <Cursor />
        <ScrollProgress />
        <SocialRail />
        <SmoothScroll>
          <Navbar />
          <main id="konten">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
