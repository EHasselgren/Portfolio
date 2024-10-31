import React, { useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { Animation } from "../shared/Animation";
import { SkillCardProps, Skill } from "../../types/types";
import { useSkillCardAnimation } from "../../hooks/useSkillCardAnimation";
import { BurstSkill } from "./BurstSkill";

export const SkillCard: React.FC<SkillCardProps> = ({
  title,
  skills: initialSkills,
  delay,
}) => {
  const [skills, setSkills] = useState<Skill[]>(
    initialSkills.map((skill) => ({
      text: skill,
      isPopping: false,
      isVisible: true,
      isAnimatingIn: false,
    }))
  );

  const [isRegenerating, setIsRegenerating] = useState(false);
  const { springProps, hoverProps, handleHover, cardAnimationController  } = useSkillCardAnimation(delay);

  const progress = ((initialSkills.length - skills.filter(s => s.isVisible).length) / initialSkills.length) * 100;

  const progressSpring = useSpring({
    width: `${progress}%`,
    config: {
      tension: progress === 0 ? 80 : 140,
      friction: progress === 0 ? 20 : 16,
      mass: progress === 0 ? 2 : 1,
      clamp: progress !== 0,
    }
  });

  useEffect(() => {
    const visibleSkills = skills.filter((skill) => skill.isVisible);
    if (visibleSkills.length === 0) {
      setIsRegenerating(true);
      cardAnimationController .start({
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1 },
      });

      setTimeout(() => {
        setSkills(
          initialSkills.map((skill) => ({
            text: skill,
            isPopping: false,
            isVisible: true,
            isAnimatingIn: true,
          }))
        );
        setIsRegenerating(false);
      }, 1000);
    }
  }, [skills, initialSkills, cardAnimationController ]);

  const handlePop = (index: number) => {
    setSkills(prevSkills => prevSkills.map((skill, i) => 
      i === index ? { ...skill, isPopping: true, isVisible: false } : skill
    ));
  };

  return (
    <animated.div
      style={{
        ...springProps,
        ...hoverProps,
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="p-4 bg-white rounded-lg min-h-[100%] shadow-md hover:shadow-xl transition-110 duration-300 border border-slate-100 relative group flex flex-col"
    >
      <h3 className="text-2xl font-['Poppins'] text-center font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
        {title}
      </h3>
      <div className="flex-1 flex flex-wrap gap-1 justify-center mb-4">
        {!isRegenerating &&
          skills.map((skill, index) => (
            <Animation
              key={`${skill.text}-${index}-${skill.isAnimatingIn ? "animating" : "static"}`}
              delay={skill.isAnimatingIn ? delay : 0}
              oneByOne={{
                index,
                totalItems: skills.length,
                delayBetween: 100,
              }}
            >
              {skill.isVisible && (
                <BurstSkill skill={skill} index={index} onPop={handlePop} />
              )}
            </Animation>
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

export default SkillCard;