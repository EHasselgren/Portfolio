import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { BUBBLE_MESSAGES } from "../../constants/messages";

interface TalkBubbleProps {
  initialDelay?: number;
  showDuration?: number;
  hideDuration?: number;
  isSkillPopped?: boolean;
}

export const TalkBubble: React.FC<TalkBubbleProps> = ({
  initialDelay = 2000,
  showDuration = 3000,
  hideDuration = 2000,
  isSkillPopped = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const getRandomMessage = () => {
    const newMessage =
      BUBBLE_MESSAGES[Math.floor(Math.random() * BUBBLE_MESSAGES.length)];
    return newMessage;
  };

  useEffect(() => {
    if (isSkillPopped) {
      setIsVisible(false);
      return;
    }

    const initialTimer = setTimeout(() => {
      setCurrentMessage(getRandomMessage());
      setIsVisible(true);
      startCycle();
    }, initialDelay);

    function startCycle() {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);

        const showTimer = setTimeout(() => {
          if (!isSkillPopped) {
            setCurrentMessage(getRandomMessage());
            setIsVisible(true);
            startCycle();
          }
        }, hideDuration);

        return () => clearTimeout(showTimer);
      }, showDuration);

      return () => clearTimeout(hideTimer);
    }

    return () => clearTimeout(initialTimer);
  }, [initialDelay, showDuration, hideDuration, isSkillPopped]);

  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    scale: isVisible ? 1 : 0,
    config: {
      tension: 300,
      friction: 20,
    },
  });

  if (isSkillPopped) return null;

  return (
    <animated.div
      style={{
        ...springProps,
        position: "absolute",
        left: "280%",
        bottom: "70%",
        transform: springProps.scale.to((s) => `scale(${s}) translateY(-50%)`),
      }}
      className="relative"
    >
      <div className="absolute inset-0 px-2 py-1 rounded-3xl shadow-md bg-gradient-to-r from-blue-600 to-cyan-600">
        <div
          style={{
            clipPath: "polygon(70% 0, 30% 0, 50% 100%)",
          }}
          className="absolute w-5 h-5 -bottom-[10px] left-[5px] rotate-45 bg-blue-600 shadow-md "
        />
      </div>
      <div className="relative z-10 px-2 py-1 text-sm flex items-center text-center font-[Poppins] justify-center min-w-[120px] max-w-[200px] text-white">
        {currentMessage}
      </div>
    </animated.div>
  );
};
