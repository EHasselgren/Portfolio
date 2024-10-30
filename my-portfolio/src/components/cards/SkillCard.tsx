import React, { useState, useEffect } from "react";
import { Animation } from "../shared/Animation";
import { useSpring, animated, to } from "react-spring";
import usePopSound from "../../hooks/usePopSound";

interface Skill {
  text: string;
  isPopping: boolean;
  isVisible: boolean;
  isAnimatingIn?: boolean;
}

interface SkillCardProps {
  title: string;
  skills: string[];
  delay?: number;
}

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

  useEffect(() => {
    const visibleSkills = skills.filter((skill) => skill.isVisible);
    if (visibleSkills.length === 0) {
      setTimeout(() => {
        setSkills(
          initialSkills.map((skill) => ({
            text: skill,
            isPopping: false,
            isVisible: true,
            isAnimatingIn: true,
          }))
        );
      }, 1000);
    }
  }, [skills, initialSkills]);

  const BurstSkill: React.FC<{ skill: Skill; index: number }> = ({
    skill,
    index,
  }) => {
    const playPop = usePopSound();
    const [{ scale, opacity }, api] = useSpring(() => ({
      scale: 1,
      opacity: 1,
      config: {
        tension: 300,
        friction: 10,
      },
    }));

    const handleClick = () => {
      playPop();

      api.start({
        to: { scale: 0, opacity: 0 },
      });

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
      <div className="relative">
        <animated.span
          onClick={handleClick}
          className={`
            px-3 py-1 
            bg-gradient-to-br from-purple-400 to-blue-500
            text-white rounded-full text-sm
            flex items-center justify-center
            min-w-[48px]
            cursor-pointer
            hover:scale-110
          `}
          style={{
            opacity,
            transform: to([scale], (s) => `scale(${s})`),
            position: "relative",
          }}
        >
          {skill.text}
        </animated.span>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg min-h-[100%] shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 relative">
      <h3 className="text-2xl font-['Poppins'] text-center font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1 justify-center">
        {skills.map((skill, index) => (
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
            {skill.isVisible && <BurstSkill skill={skill} index={index} />}
          </Animation>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
