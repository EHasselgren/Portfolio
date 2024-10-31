import React from 'react';
import { animated, useSpring } from '@react-spring/web';

interface BurstSkillProps {
  text: string; 
  index: number;
  onPop: (index: number) => void;
}

export const BurstSkill: React.FC<BurstSkillProps> = ({ text, index, onPop }) => {
  const [springs, api] = useSpring(() => ({
    opacity: 1,
    scale: 1,
    config: {
      tension: 300,
      friction: 10,
    },
  }));

  const handleClick = () => {
    api.start({
      to: { opacity: 0, scale: 0 },
    });
    onPop(index);
  };

  return (
    <div className="relative">
      <animated.span
        onClick={handleClick}
        className="px-3 py-1 bg-gradient-to-br from-purple-400 to-blue-500 
                  text-white rounded-full text-sm flex items-center justify-center 
                  min-w-[48px] cursor-pointer hover:scale-110 transition-transform"
        style={springs}
      >
        {text}
      </animated.span>
    </div>
  );
};