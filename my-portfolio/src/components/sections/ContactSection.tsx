import React from "react";
import HeaderSection from "../text/HeaderSection";
import TextSection from "../text/TextSection";
import { Animation } from "../shared/Animation";
import SocialLinks from "../links/SocialLinks";

export const ContactSection = React.forwardRef<HTMLDivElement>((_, ref) => {
  const text = "Interested in working together? Let's connect!";

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-200 to-white"
    >
      <div className="max-w-3xl text-center">
        <Animation delay={0}>
          <HeaderSection title="Get in Touch"/>
        </Animation>
        <Animation delay={300}>
          <TextSection text={text} />
        </Animation>
        <Animation delay={600}>
          <SocialLinks />
        </Animation>
      </div>
    </section>
  );
});
