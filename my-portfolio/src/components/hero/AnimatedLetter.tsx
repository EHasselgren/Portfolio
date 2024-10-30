import { FC } from "react";

interface AnimatedLetterProps {
  letter: string;
  index: number;
  inView: boolean;
  shouldReset: boolean;
  onHover: (index: number) => void;
  getDelay: (index: number) => string;
}

export const AnimatedLetter: FC<AnimatedLetterProps> = ({
  letter,
  index,
  inView,
  shouldReset,
  onHover,
  getDelay,
}) => (
  <span
    className="inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-1"
    onMouseEnter={() => onHover(index)}
    style={{
      transform: !inView || shouldReset ? "translateY(20px)" : "none",
      opacity: !inView || shouldReset ? 0 : 1,
      transitionDelay: getDelay(index),
    }}
  >
    {letter === " " ? "\u00A0" : letter}
  </span>
);
