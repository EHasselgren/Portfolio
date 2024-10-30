import React from "react";
import AnimatedText from "../text/AnimatedText";
import HeaderText from "../text/HeaderText";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";

interface HeroSectionProps {
  onScrollClick: () => void;
}

interface HeroSectionProps {
  onScrollClick: () => void;
}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ onScrollClick }, ref) => {
    const text = "Please scroll to explore";

    return (
      <section
        ref={ref}
        className="h-screen flex items-center justify-center text-center bg-gradient-to-b from-blue-200 to-white"
      >
        <div className="flex flex-col items-center">
          <Animation delay={0}>
            <HeaderText title="Welcome to my Portfolio!" />
          </Animation>
          <Animation delay={300}>
            <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-transparent bg-clip-text text-xl font-['Poppins']">
              <AnimatedText text={text} />
            </div>
          </Animation>
          <Animation delay={600}>
            <ScrollButton onScrollClick={onScrollClick} />
          </Animation>
        </div>
      </section>
    );
  }
);
