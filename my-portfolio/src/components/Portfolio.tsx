import { RefObject, useRef } from "react";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./about/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";
import { BottomSection } from "./sections/BottomSection";

const Portfolio = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection ref={heroRef} onScrollClick={() => scrollTo(aboutRef)} />
      <AboutSection ref={aboutRef} onScrollClick={() => scrollTo(skillsRef)} />
      <SkillsSection
        ref={skillsRef}
        onScrollClick={() => scrollTo(projectsRef)}
      />
      <ProjectsSection
        ref={projectsRef}
        onScrollClick={() => scrollTo(contactRef)}
      />
      <ContactSection ref={contactRef} />
      <BottomSection onScrollToHero={() => scrollTo(heroRef)} />
    </div>
  );
};

export default Portfolio;
