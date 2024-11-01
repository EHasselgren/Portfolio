import { FC } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { AnimatedLetter } from "./AnimatedLetter";
import { AnimatedTextContainer } from "./AnimatedTextContainer";
import { useAnimationState } from "../../hooks/useAnimationState";

interface HeaderTextProps {
  title: string;
}

export const HeaderText: FC<HeaderTextProps> = ({ title }) => {
  const [ref, inView] = useScrollAnimation();
  const letters = title.split("");
  const {
    isHovered,
    shouldReset,
    handleLetterHover,
    handleMouseLeave,
    getAnimationDelay,
  } = useAnimationState(letters);

  return (
    <div ref={ref}>
      <AnimatedTextContainer
        isHovered={isHovered}
        onMouseLeave={handleMouseLeave}
      >
        {letters.map((letter: string, index: number) => (
          <AnimatedLetter
            key={index}
            letter={letter}
            index={index}
            inView={inView}
            shouldReset={shouldReset}
            onHover={handleLetterHover}
            getDelay={getAnimationDelay}
          />
        ))}
      </AnimatedTextContainer>
    </div>
  );
};