import { useState, forwardRef, useCallback, memo } from "react";
import { HeaderText } from "../text/HeaderText";
import { SkillCard } from "./SkillCard";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";
import FlyingBanner from "./FlyingBanner";
import { COMPLETION_MESSAGES } from "../../constants/messages";

interface SkillsSectionProps {
  onScrollClick: () => void;
}

type SkillCategory = "Frontend" | "Backend" | "Other";
type SkillsMapType = Map<SkillCategory, string[]>;

const SKILLS_MAP: SkillsMapType = new Map([
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

export const SkillsSection = memo(
  forwardRef<HTMLDivElement, SkillsSectionProps>(({ onScrollClick }, ref) => {
    const [showBubble, setShowBubble] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState("");

    useState(() => {
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 2000);
      return () => clearTimeout(timer);
    });

    const getRandomMessage = useCallback(() => {
      const randomIndex = Math.floor(Math.random() * COMPLETION_MESSAGES.length);
      return COMPLETION_MESSAGES[randomIndex];
    }, []);

    const handleCardComplete = useCallback((regenerate: () => void) => {
      setBannerMessage(getRandomMessage());
      setShowBanner(true);
      regenerate();
    }, [getRandomMessage]);

    const handleBannerComplete = useCallback(() => {
      setShowBanner(false);
    }, []);

    return (
      <>
        <section
          ref={ref}
          className="min-h-screen flex items-center justify-center 
                     bg-gradient-to-b from-blue-200 to-white"
        >
          <Animation className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-0">
            <HeaderText title="Technical Skills" />
            
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-stretch">
              {Array.from(SKILLS_MAP).map(([category, skills], index) => (
                <Animation
                  key={category}
                  oneByOne={{
                    index,
                    totalItems: SKILLS_MAP.size,
                    delayBetween: 300,
                  }}
                  className="w-[16rem]"
                >
                  <SkillCard
                    title={category}
                    skills={skills}
                    delay={800}
                    showBubble={showBubble && index === SKILLS_MAP.size - 1}
                    targetSkillIndex={0}
                    onComplete={handleCardComplete}
                  />
                </Animation>
              ))}
            </div>

            <Animation delay={1000}>
              <ScrollButton onScrollClick={onScrollClick} />
            </Animation>
          </Animation>
        </section>

        <FlyingBanner
          message={bannerMessage}
          isVisible={showBanner}
          onComplete={handleBannerComplete}
        />
      </>
    );
  })
);

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;