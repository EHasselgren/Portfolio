import React from 'react';
import { User } from 'lucide-react';
import { AnimatedSection } from '../shared/AnimatedSection';
import HeaderSection from '../text/HeaderSection';
import TextSection from '../text/TextSection';
import { ScrollButton } from '../buttons/ScrollButton';

interface AboutSectionProps {
  onScrollClick: () => void;
}

const text = "Hi! My name is Elias Hasselgren and I'm a Swedish Fullstack Developer specializing in React and TypeScript. I have worked in several projects and have a lot of experience working in an international environment. I'm passionate about design and customer experiences!";

export const AboutSection = React.forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ onScrollClick }, ref) => {
    return (
      <section
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50"
      >
        <AnimatedSection className="max-w-3xl text-center">
          <HeaderSection title="About Me" Icon={User} />
          <div className="my-8">
            <img
              src="/images/profile.jpg"
              alt="Elias Hasselgren"
              className="w-[15vw] h-[15vw] rounded-full object-cover mx-auto shadow-lg"
            />
          </div>
          <TextSection text={text} />
          <ScrollButton onScrollClick={onScrollClick} />
        </AnimatedSection>
      </section>
    );
  }
);