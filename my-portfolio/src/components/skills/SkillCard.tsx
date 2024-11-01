import { useState, useCallback, useMemo, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { BurstSkill } from "./BurstSkill";
import { TalkBubble } from "./TalkBubble";
import { useSkillCardAnimation } from "../../hooks/useSkillCardAnimation";
import { Animation } from "../shared/Animation";

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
  const [cycleCount, setCycleCount] = useState(0);

  const { springProps, hoverProps, handleHover, cardAnimationController } =
    useSkillCardAnimation(delay);

  const progress = useMemo(() => {
    const visibleCount = skills.filter((s) => s.isVisible).length;
    return ((initialSkills.length - visibleCount) / initialSkills.length) * 100;
  }, [skills, initialSkills.length]);

  const progressSpring = useSpring({
    width: `${isTransitioning ? 0 : progress}%`,
    config: {
      tension: 140,
      friction: 24,
      clamp: true,
      mass: 0.8,
      duration: isTransitioning ? 600 : undefined,
    },
  });

  const regenerateSkills = useCallback(() => {
    setIsTransitioning(true);
    cardAnimationController.start({
      from: { scale: 0.8, opacity: 0 },
      to: { scale: 1, opacity: 1 },
    });

    setTimeout(() => {
      setIsTransitioning(false);
      setSkills(
        initialSkills.map((skill) => ({ text: skill, isVisible: true }))
      );
      setIsAnySkillPopped(false);
      setCycleCount((prev) => prev + 1);
    }, 600);
  }, [cardAnimationController, initialSkills]);

  const handlePop = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsAnySkillPopped(true);
      setSkills((prev) =>
        prev.map((skill, i) =>
          i === index ? { ...skill, isVisible: false } : skill
        )
      );
    },
    [isTransitioning]
  );

  useEffect(() => {
    const visibleSkillCount = skills.filter((skill) => skill.isVisible).length;
    if (visibleSkillCount === 0 && !isTransitioning) {
      setTimeout(() => {
        onComplete(regenerateSkills);
      }, 400);
    }
  }, [skills, onComplete, regenerateSkills, isTransitioning]);

  // Calculate individual delays for each skill
  const getSkillDelay = (index: number) => {
    return delay + 400 + index * 50;
  };

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
      <Animation delay={delay + 200}>
        <h3
          className="text-lg sm:text-xl md:text-2xl
                 font-['Poppins'] text-center font-bold mb-2
                 bg-gradient-to-r from-blue-600 to-cyan-600
                 bg-clip-text text-transparent drop-shadow-lg"
        >
          {title}
        </h3>
      </Animation>
      <div className="flex-1 flex flex-wrap gap-1 justify-center mb-4">
        {skills.map(
          (skill, skillIndex) =>
            skill.isVisible && (
              <Animation
                key={`${skillIndex}-${cycleCount}`}
                delay={getSkillDelay(skillIndex)}
              >
                <div className="relative">
                  <BurstSkill
                    text={skill.text}
                    index={skillIndex}
                    onPop={handlePop}
                  />
                  {showBubble && skillIndex === targetSkillIndex && (
                    <TalkBubble
                      initialDelay={3000}
                      showDuration={3000}
                      hideDuration={2000}
                      isSkillPopped={isAnySkillPopped}
                    />
                  )}
                </div>
              </Animation>
            )
        )}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <animated.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-400"
          style={progressSpring}
        />
      </div>
    </animated.div>
  );
};

export default SkillCard;
