import React, { useState, useEffect } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { WORD_DELAY } from "../../utils/animationUtils";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  onAnimationComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  onAnimationComplete,
}) => {
  const words = text.split(" ");
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const [ref, inView] = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      const startTimer = setTimeout(() => {
        setShouldStartAnimation(true);
      }, delay);

      return () => clearTimeout(startTimer);
    }
  }, [inView, delay]);

  useEffect(() => {
    if (shouldStartAnimation) {
      setVisibleWords(0);

      const timer = setInterval(() => {
        setVisibleWords((prev) => {
          if (prev < words.length) {
            return prev + 1;
          }
          clearInterval(timer);
          if (onAnimationComplete) {
            onAnimationComplete();
          }
          return prev;
        });
      }, WORD_DELAY);

      return () => clearInterval(timer);
    }
  }, [shouldStartAnimation, words.length, onAnimationComplete]);

  const visibleText = words.slice(0, visibleWords).join(" ");

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="transition-opacity duration-300"
    >
      {visibleText}
    </div>
  );
};

export default AnimatedText;
