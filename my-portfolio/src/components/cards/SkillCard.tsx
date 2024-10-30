import React, { useState, useEffect } from "react";
import { animated } from "react-spring";
import { Animation } from "../shared/Animation";
import { SkillCardProps, Skill } from "../../types/types";
import { useSkillCardAnimation } from "../../hooks/useSkillCardAnimation";
import { BurstSkill } from "../shared/BurstSkill";

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
  const { springProps, hoverProps, handleHover, api } =
    useSkillCardAnimation(delay);

  useEffect(() => {
    const visibleSkills = skills.filter((skill) => skill.isVisible);
    if (visibleSkills.length === 0) {
      setIsRegenerating(true);
      api.start({
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
  }, [skills, initialSkills, api]);

  const handlePop = (index: number) => {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      newSkills[index] = {
        ...newSkills[index],
        isPopping: true,
      };
      return newSkills;
    });

    setTimeout(() => {
      setSkills((prevSkills) => {
        const newSkills = [...prevSkills];
        newSkills[index] = {
          ...newSkills[index],
          isVisible: false,
        };
        return newSkills;
      });
    }, 500);
  };

  return (
    <animated.div
      style={{
        ...springProps,
        ...hoverProps,
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="p-4 bg-white rounded-lg min-h-[100%] shadow-md hover:shadow-xl transition-110 duration-300 border border-slate-100 relative group"
    >
      <h3 className="text-2xl font-['Poppins'] text-center font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1 justify-center">
        {!isRegenerating &&
          skills.map((skill, index) => (
            <Animation
              key={`${skill.text}-${index}-${
                skill.isAnimatingIn ? "animating" : "static"
              }`}
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
    </animated.div>
  );
};

export default SkillCard;
