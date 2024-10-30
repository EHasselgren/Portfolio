import React from "react";
import { animated, to, useSpring } from "react-spring";
import { Skill } from "../../types/types";
import usePopSound from "../../hooks/usePopSound";

interface BurstSkillProps {
  skill: Skill;
  index: number;
  onPop: (index: number) => void;
}

export const BurstSkill: React.FC<BurstSkillProps> = ({
  skill,
  index,
  onPop,
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
    onPop(index);
  };

  return (
    <div className="relative">
      <animated.span
        onClick={handleClick}
        className="px-3 py-1 bg-gradient-to-br from-purple-400 to-blue-500 text-white rounded-full text-sm flex items-center justify-center min-w-[48px] cursor-pointer hover:scale-110"
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
