import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { BurstSkill } from "./BurstSkill";
import { TalkBubble } from "./TalkBubble";
import { useSkillCardAnimation } from "../../hooks/useSkillCardAnimation";

interface SkillCardProps {
  title: string;
  skills: string[];
  delay: number;
  showBubble: boolean;
  targetSkillIndex: number;
  onComplete: (shouldRegenerate: () => void) => void;
}

interface Skill {
  text: string;
  isVisible: boolean;
}

export const SkillCard = ({
  title,
  skills: initialSkills,
  delay,
  showBubble,
  targetSkillIndex,
  onComplete,
}: SkillCardProps) => {
  const [isAnySkillPopped, setIsAnySkillPopped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [skills, setSkills] = useState<Skill[]>(() =>
    initialSkills.map((skill) => ({
      text: skill,
      isVisible: true,
    }))
  );

  const { springProps, hoverProps, handleHover, cardAnimationController } =
    useSkillCardAnimation(delay);

  // Track whether we've triggered completion
  const completionTriggered = useRef(false);

  // Memoize progress calculation
  const progress = useMemo(() => {
    const visibleCount = skills.filter((s) => s.isVisible).length;
    return ((initialSkills.length - visibleCount) / initialSkills.length) * 100;
  }, [skills, initialSkills.length]);

  // Progress bar animation with smoother transitions
  const progressSpring = useSpring({
    width: `${isTransitioning ? 0 : progress}%`,
    config: {
      tension: 120,
      friction: 16,
      mass: 1,
      duration: isTransitioning ? 600 : undefined, // Fixed duration for reset animation
    },
    onRest: () => {
      if (isTransitioning) {
        setIsTransitioning(false);
        setSkills(initialSkills.map(skill => ({ text: skill, isVisible: true })));
        setIsAnySkillPopped(false);
        completionTriggered.current = false;
      }
    },
  });

  const regenerateSkills = useCallback(() => {
    setIsTransitioning(true);
    cardAnimationController.start({
      from: { scale: 0.8, opacity: 0 },
      to: { scale: 1, opacity: 1 },
    });
  }, [cardAnimationController]);

  const handlePop = useCallback((index: number) => {
    setIsAnySkillPopped(true);
    setSkills((prev) =>
      prev.map((skill, i) =>
        i === index ? { ...skill, isVisible: false } : skill
      )
    );
  }, []);

  // Check for completion
  useEffect(() => {
    if (completionTriggered.current) return;

    const visibleSkillCount = skills.filter((skill) => skill.isVisible).length;
    if (visibleSkillCount === 0) {
      completionTriggered.current = true;
      // Wait for the last pop animation to complete
      setTimeout(() => {
        onComplete(regenerateSkills);
      }, 400);
    }
  }, [skills, onComplete, regenerateSkills]);

  return (
    <animated.div
      style={{
        ...springProps,
        ...hoverProps,
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="p-4 bg-white rounded-lg min-h-[100%] shadow-md hover:shadow-xl 
                 transition-all duration-300 border border-slate-100 relative 
                 group flex flex-col"
    >
      <h3 className="text-2xl font-['Poppins'] text-center font-bold mb-2 
                     bg-gradient-to-r from-purple-500 to-blue-400 
                     bg-clip-text text-transparent drop-shadow-lg">
        {title}
      </h3>

      <div className="flex-1 flex flex-wrap gap-1 justify-center mb-4">
        {skills.map((skill, index) => (
          skill.isVisible && (
            <div key={index} className="relative">
              <BurstSkill
                text={skill.text}
                index={index}
                onPop={handlePop}
              />
              {showBubble && index === targetSkillIndex && (
                <TalkBubble
                  initialDelay={2000}
                  showDuration={3000}
                  hideDuration={2000}
                  isSkillPopped={isAnySkillPopped}
                />
              )}
            </div>
          )
        ))}
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-auto">
        <animated.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-400"
          style={progressSpring}
        />
      </div>
    </animated.div>
  );
};