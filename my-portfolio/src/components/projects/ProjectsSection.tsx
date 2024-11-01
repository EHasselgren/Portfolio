import React from "react";
import { HeaderText } from "../text/HeaderText";
import ProjectCard from "./ProjectCard";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";
import MunamiiCakery from "../../assets/images/munamii-cakery.png";
import Moneytracker from "../../assets/images/Moneytracker.png";
import Api from "../../assets/images/Api.png";
import AssetTracker from "../../assets/images/asset-tracker.png";

interface ProjectsSectionProps {
  onScrollClick: () => void;
}

export const ProjectsSection = React.forwardRef<
  HTMLDivElement,
  ProjectsSectionProps
>(({ onScrollClick }, ref) => {
  const projects = [
    {
      title: "Munamii Cakery Frontend",
      description:
        "React-based frontend for a bakery business, featuring product showcase and ordering system",
      technologies: ["TypeScript", "React", "Tailwind CSS"],
      githubUrl: "https://github.com/EHasselgren/munamii-cakery",
      imageUrl: MunamiiCakery,
    },
    {
      title: "Money Tracker",
      description:
        "Terminal-based application for tracking personal finances, has advanced filtering and is styled using spectre.console",
      technologies: ["C#", ".NET", "spectre.console"],
      githubUrl: "https://github.com/EHasselgren/MoneyTracker",
      imageUrl: Moneytracker,
    },
    {
      title: "Munamii Cakery API",
      description:
        "Backend API service for a bakery business, handling product management and orders",
      technologies: ["JavaScript", "Express", "MongoDB", "Node.js"],
      githubUrl: "https://github.com/EHasselgren/munamii-cakery-api",
      imageUrl: Api,
    },
    {
      title: "Asset Tracker",
      description:
        "Console application for managing assets, converts prices into local currency using https://www.exchangerate-api.com/",
      technologies: ["C#", ".NET"],
      githubUrl: "https://github.com/EHasselgren/AssetTracker",
      imageUrl: AssetTracker,
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-200"
    >
      <Animation>
        <div className="max-w-6xl flex flex-col items-center px-4">
          <Animation>
            <HeaderText title="Projects" />
          </Animation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <Animation
                key={index}
                oneByOne={{
                  index,
                  totalItems: projects.length,
                  delayBetween: 350,
                }}
              >
                <ProjectCard
                  {...project}
                  delay={1200 + index * 300}
                  index={index}
                />
              </Animation>
            ))}
          </div>
          <Animation delay={1500}>
            <ScrollButton onScrollClick={onScrollClick} />
          </Animation>
        </div>
      </Animation>
    </section>
  );
});
