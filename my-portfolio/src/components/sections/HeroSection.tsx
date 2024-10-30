import React from "react";
import TextSection from "../text/TextSection";
import HeaderSection from "../text/HeaderSection";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";

interface HeroSectionProps {
  onScrollClick: () => void;
}

const text = "Please scroll to explore";

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollClick }) => {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-blue-200 to-white">
      <div className="flex flex-col items-center">
        <Animation delay={0}>
          <HeaderSection title="Welcome to my Portfolio!" />
        </Animation>
        <Animation delay={300}>
          <TextSection text={text} />
        </Animation>
        <Animation delay={600}>
          <ScrollButton onScrollClick={onScrollClick} />
        </Animation>
      </div>
    </section>
  );
};
