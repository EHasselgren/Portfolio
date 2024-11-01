import React from "react";
import { HeaderText } from "../text/HeaderText";
import AnimatedText from "../text/ScrollWordAnimatedText";
import { Animation } from "../shared/Animation";
import SocialLinks from "./SocialLinks";
import { ScrollButton } from "../buttons/ScrollButton";

interface ContactSectionProps {
  onScrollToHero: () => void;
}

export const ContactSection = React.forwardRef<
  HTMLDivElement,
  ContactSectionProps
>(({ onScrollToHero }, ref) => {
  const text = "Interested in working together? Let's connect!";

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-white"
    >
      <div className="max-w-3xl text-center">
        <Animation delay={0}>
          <HeaderText title="Get in Touch!" />
        </Animation>
        <Animation delay={300}>
          <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-transparent bg-clip-text text-xl mb-4 font-['Poppins']">
            <AnimatedText text={text} />
          </div>
        </Animation>
        <Animation delay={600}>
          <SocialLinks />
        </Animation>
      </div>
      <div className="absolute bottom-8 mt-[-10vw] md:mt-[-20vw] sm:mt-[-35vw]">
        <Animation delay={0}>
          <ScrollButton onScrollClick={onScrollToHero} direction="up" />
        </Animation>
      </div>
    </section>
  );
});
