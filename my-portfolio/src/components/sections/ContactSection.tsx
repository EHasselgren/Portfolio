import React from 'react';
import { Mail } from 'lucide-react';
import { AnimatedSection } from '../shared/AnimatedSection';
import HeaderSection from '../text/HeaderSection';
import TextSection from '../text/TextSection';


export const ContactSection = React.forwardRef<HTMLDivElement>((_, ref) => {
  const text = "Interested in working together? Let's connect!";

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-blue-50">
      <AnimatedSection className="max-w-3xl text-center">
        <HeaderSection title="Get in Touch" Icon={Mail} />
        <TextSection text={text} />
      </AnimatedSection>
    </section>
  );
});