import React from "react";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";

interface BottomSectionProps {
  onScrollToHero: () => void;
}

export const BottomSection: React.FC<BottomSectionProps> = ({
  onScrollToHero,
}) => {
  return (
    <section className=" flex mt-[-10vw] justify-center ">
      <Animation delay={0}>
        <ScrollButton onScrollClick={onScrollToHero} direction="up" />
      </Animation>
    </section>
  );
};
