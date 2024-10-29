import React from "react";
import { Briefcase } from "lucide-react";
import { AnimatedSection } from "../shared/AnimatedSection";
import HeaderSection from "../text/HeaderSection";
import { ProjectCard } from "../cards/ProjectCard";
import { ScrollButton } from "../buttons/ScrollButton";

interface ProjectsSectionProps {
  onScrollClick: () => void;
}

export const ProjectsSection = React.forwardRef<HTMLDivElement, ProjectsSectionProps>(({ onScrollClick }, ref) => {
  const projects = [
    {
      title: "Project 1",
      description: "Description of your first project",
      technologies: ["React", "TypeScript"],
    },
    {
      title: "Project 2",
      description: "Description of your second project",
      technologies: ["Node.js", "MySQL"],
    },
  ];
  

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center  bg-white">
      <AnimatedSection className="max-w-3xl w-full flex flex-col items-center">
        <HeaderSection title="Projects" Icon={Briefcase} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
            />
          ))}
        </div>
        <ScrollButton onScrollClick={onScrollClick} />
      </AnimatedSection>
    </section>
  );
});
