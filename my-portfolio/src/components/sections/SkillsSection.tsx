import React from "react";
import HeaderSection from "../text/HeaderSection";
import { SkillCard } from "../cards/SkillCard";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";

interface SkillsSectionProps {
  onScrollClick: () => void;
}

const skillsMap = new Map([
  [
    "Frontend",
    ["React", "TypeScript", "Tailwind", "Bootstrap", "Angular", "JavaScript"],
  ],
  [
    "Backend",
    ["Node.js", "MySQL", "C#", ".net", "asp.net", "Restfull apis", "Swagger"],
  ],
  [
    "Other",
    ["Figma", "Github", "Jira", "UX", "CSM", "UI", "Project Management"],
  ],
]);

export const SkillsSection = React.forwardRef<
  HTMLDivElement,
  SkillsSectionProps
>(({ onScrollClick }, ref) => {
  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-white"
    >
      <Animation className="max-w-3xl w-full flex flex-col items-center">
        <HeaderSection title="Technical Skills" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {Array.from(skillsMap).map(([category, skills], index) => (
            <Animation
              key={category}
              oneByOne={{
                index,
                totalItems: skillsMap.size,
                delayBetween: 300,
              }}
            >
              <SkillCard title={category} skills={skills} delay={800} />
            </Animation>
          ))}
        </div>
        <Animation delay={1000}>
          <ScrollButton onScrollClick={onScrollClick} />
        </Animation>
      </Animation>
    </section>
  );
});

export default SkillsSection;
