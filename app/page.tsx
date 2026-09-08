import Hero from "@/components/sections/Hero";
import ImpactStats from "@/components/sections/ImpactStats";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import CaseStudies from "@/components/sections/CaseStudies";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import ResumeSection from "@/components/sections/ResumeSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <About />
      <Experience />
      <CaseStudies />
      <Skills />
      <Certifications />
      <ResumeSection />
      <Contact />
    </>
  );
}