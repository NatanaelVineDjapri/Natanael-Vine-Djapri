import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Grain from "@/components/chrome/Grain";
import Cursor from "@/components/chrome/Cursor";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import SocialRail from "@/components/chrome/SocialRail";
import { getProfile } from "@/lib/data/profile";

/**
 * Chrome for the public site only — Navbar, Footer, grain/cursor/scroll
 * effects, the lanyard-adjacent social rail. Kept out of the true root
 * layout so /dashboard (a sibling route, not nested under this group) never
 * inherits any of it.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();

  return (
    <>
      <Grain />
      <Cursor />
      <ScrollProgress />
      <SocialRail />
      <SmoothScroll>
        <Navbar profile={profile} />
        <main id="konten">{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
