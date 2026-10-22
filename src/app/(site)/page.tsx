import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import { getProjects } from "@/lib/data/projects";
import { getExperience } from "@/lib/data/experience";
import { getCertifications } from "@/lib/data/certifications";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, experience, certifications] = await Promise.all([
    getProjects(),
    getExperience(),
    getCertifications(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects projects={projects} />
      <Certifications certifications={certifications} />
      <Experience experience={experience} />
      <Contact />
    </>
  );
}
