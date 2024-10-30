import React from "react";
import HeaderSection from "../text/HeaderSection";
import AnimatedText from "../text/AnimatedText";
import { Animation } from "../shared/Animation";
import SocialLinks from "../links/SocialLinks";

export const ContactSection = React.forwardRef<HTMLDivElement>((_, ref) => {
  const text = "Interested in working together? Let's connect!";

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-white"
    >
      <div className="max-w-3xl text-center">
        <Animation delay={0}>
          <HeaderSection title="Get in Touch" />
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
    </section>
  );
});
