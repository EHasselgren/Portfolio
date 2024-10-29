import React from "react";
import { Briefcase } from "lucide-react";
import { AnimatedSection } from "../shared/AnimatedSection";
import HeaderSection from "../text/HeaderSection";
import ProjectCard from "../cards/ProjectCard";
import { ScrollButton } from "../buttons/ScrollButton";

interface ProjectsSectionProps {
  onScrollClick: () => void;
}

export const ProjectsSection = React.forwardRef<HTMLDivElement, ProjectsSectionProps>(
  ({ onScrollClick }, ref) => {
    const projects = [
      {
        title: "Munamii Cakery Frontend",
        description: "React-based frontend for a bakery business, featuring product showcase and ordering system",
        technologies: ["TypeScript", "React", "Tailwind CSS"],
        githubUrl: "https://github.com/EHasselgren/munamii-cakery",
        imageUrl: "/images/munamii-cakery.png"
      },
      {
        title: "Money Tracker",
        description: "Terminal-based application for tracking personal finances, has advanced filtering and is styled using spectre.console",
        technologies: ["C#", ".NET"],
        githubUrl: "https://github.com/EHasselgren/MoneyTracker",
        imageUrl: "/images/Moneytracker.png"
      },
      {
        title: "Munamii Cakery API",
        description: "Backend API service for a bakery business, handling product management and orders",
        technologies: ["JavaScript", "Express", "MongoDB", "Node.js"],
        githubUrl: "https://github.com/EHasselgren/munamii-cakery-api",
        imageUrl: "/images/api.png"
      },
      {
        title: "Asset Tracker",
        description: "Console application for managing and tracking assets, converts dollar price of assets into local currency depending on location using https://www.exchangerate-api.com/",
        technologies: ["C#", ".NET"],
        githubUrl: "https://github.com/EHasselgren/AssetTracker",
        imageUrl: "/images/asset-tracker.png"
      }
    ];

    return (
      <section ref={ref} className="min-h-screen flex flex-col items-center justify-center bg-white">
        <AnimatedSection className="max-w-6xl w-full flex flex-col items-center px-4">
          <HeaderSection title="Projects" Icon={Briefcase} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
              />
            ))}
          </div>
          <ScrollButton onScrollClick={onScrollClick} />
        </AnimatedSection>
      </section>
    );
  }
);

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;