import React from 'react';
import { User } from 'lucide-react';
import { AnimatedSection } from '../shared/AnimatedSection';
import HeaderSection from '../text/HeaderSection';
import TextSection from '../text/TextSection';
import { ScrollButton } from '../buttons/ScrollButton';

interface AboutSectionProps {
  onScrollClick: () => void;
}

const text = "Hi! My name is Elias Hasselgren and I'm a Fullstack Developer specializing in React and TypeScript.";

export const AboutSection = React.forwardRef<HTMLDivElement, AboutSectionProps>(({ onScrollClick }, ref) => {
  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <AnimatedSection className="max-w-3xl text-center">
        <HeaderSection title="About Me" Icon={User} />
        <TextSection text={text} />
        <ScrollButton onScrollClick={onScrollClick} />
      </AnimatedSection>
    </section>
  );
});