import React from "react";
import TextSection from "../text/TextSection";
import HeaderSection from "../text/HeaderSection";
import { ScrollButton } from "../buttons/ScrollButton";
import { AnimatedSection } from "../shared/AnimatedSection";


interface HeroSectionProps {
  onScrollClick: () => void;
}

const text = "Please scroll to explore!";

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollClick }) => {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <AnimatedSection className="flex flex-col items-center">
        <HeaderSection title="Welcome to my Portfolio" />
        <TextSection text={text} />
          <ScrollButton onScrollClick={onScrollClick} />
      </AnimatedSection>
    </section>
  );
};