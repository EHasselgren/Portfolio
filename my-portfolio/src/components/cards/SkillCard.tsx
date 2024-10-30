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

  // Track whether skills are being regenerated
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Card entrance and hover animations
  const [springProps, api] = useSpring(() => ({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: {
      tension: 300,
      friction: 10,
    },
    delay: delay,
  }));

  const [hoverProps, hoverApi] = useSpring(() => ({
    scale: 1,
    config: {
      tension: 300,
      friction: 10,
    },
  }));

  const handleHover = (isHovered: boolean) => {
    hoverApi.start({
      scale: isHovered ? 1.05 : 1,
    });
  };

  useEffect(() => {
    const visibleSkills = skills.filter((skill) => skill.isVisible);
    if (visibleSkills.length === 0) {
      setIsRegenerating(true);
      // Reset the entrance animation
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

  const BurstSkill: React.FC<{ skill: Skill; index: number }> = ({
    skill,
    index,
  }) => {
    const playPop = usePopSound();
    const [{ scale, opacity }, burstApi] = useSpring(() => ({
      scale: 1,
      opacity: 1,
      config: {
        tension: 300,
        friction: 10,
      },
    }));

    const handleClick = () => {
      playPop();

      burstApi.start({
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
              {skill.isVisible && <BurstSkill skill={skill} index={index} />}
            </Animation>
          ))}
      </div>
    </animated.div>
  );
};

export default SkillCard;