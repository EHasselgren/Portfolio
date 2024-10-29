import React from "react";
import { Code } from "lucide-react";
import { AnimatedSection } from "../shared/AnimatedSection";
import HeaderSection from "../text/HeaderSection";
import { SkillCard } from "../cards/SkillCard";
import { ScrollButton } from "../buttons/ScrollButton";

interface SkillsSectionProps {
  onScrollClick: () => void;
}

export const SkillsSection = React.forwardRef<
  HTMLDivElement,
  SkillsSectionProps
>(({ onScrollClick }, ref) => {
  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white"
    >
      <AnimatedSection className="max-w-3xl w-full flex flex-col items-center">
        <HeaderSection title="Technical Skills" Icon={Code} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <SkillCard
            title="Frontend"
            skills={[
              "React",
              "TypeScript",
              "Tailwind",
              "Bootstrap",
              "Angular", "JavaScript"
            ]}
          />
          <SkillCard
            title="Backend"
            skills={["Node.js", "MySQL", "C#", '.net', "asp.net", "Restfull apis", "Swagger"]}
          />
          <SkillCard
            title="Other"
            skills={["Figma", "Github", "Jira", "UX", "CSM", "UI", "Project Management"]}
          />
        </div>
        <ScrollButton onScrollClick={onScrollClick} />
      </AnimatedSection>
    </section>
  );
});
