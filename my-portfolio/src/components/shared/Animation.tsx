import React, { useEffect, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";

interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  oneByOne?: {
    index: number;
    totalItems: number;
    delayBetween?: number;
  };
}

export const Animation: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  className = "",
  oneByOne,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      const baseDelay = delay;
      const itemDelay = oneByOne
        ? (oneByOne.delayBetween || 100) * oneByOne.index
        : 0;

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, baseDelay + itemDelay);

      return () => clearTimeout(timer);
    }
  }, [inView, delay, oneByOne]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};
