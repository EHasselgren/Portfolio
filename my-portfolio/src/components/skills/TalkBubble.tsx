import React from 'react';
import { animated, useSpring } from '@react-spring/web';

interface TalkBubbleProps {
  message: string;
}

export const TalkBubble: React.FC<TalkBubbleProps> = ({ message }) => {
  const springProps = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div
      style={{
        ...springProps,
        position: 'absolute',
        left: '280%',
        bottom: '70%',
        transform: 'translateY(-50%)',
      }}
      className="px-2 py-1 rounded-3xl shadow-md bg-slate-100 z-30 border border-gray-200 text-sm flex items-center font-[Poppins] justify-center min-w-[120px] max-w-[200px] relative"
    >
      {message}
      <div
        style={{
          clipPath: 'polygon(100% 0, 0 0, 90% 100%)',
        }}
        className="absolute w-5 h-5 -bottom-[10px] left-[5px] rotate-45 bg-slate-100 shadow-md border-t border-l border-gray-200"
      />
    </animated.div>
  );
};