import React from "react";
import { HeaderText } from "../text/HeaderText";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";
import AnimatedText from "../text/ScrollWordAnimatedText";
import { ProfileImage } from "./ProfileImage";
import { calculateAnimationDuration } from "../../utils/animationUtils";
import { CvButton } from "./CvButton";

interface AboutSectionProps {
  onScrollClick: () => void;
}

const text =
  "Hi! My name is Elias Hasselgren and I'm a Swedish Fullstack Developer specializing in React and TypeScript. I have worked on several projects and have a lot of experience working in an international environment. I'm passionate about design and customer experience!";

export const AboutSection = React.forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ onScrollClick }, ref) => {
    const TOTAL_TEXT_DURATION = calculateAnimationDuration(text);
    
    return (
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-200"
      >
        <div className="max-w-3xl text-center px-6 md:px-4">
          <Animation delay={0}>
            <HeaderText title="About Me" />
          </Animation>

          <Animation delay={300}>
            <ProfileImage alt="Elias Hasselgren" />
          </Animation>

          <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-transparent bg-clip-text text-xl mb-4 font-['Poppins'] text-left md:text-center">
            <AnimatedText text={text} />
          </div>

          <Animation 
            delay={TOTAL_TEXT_DURATION - 800}
            className="hidden md:flex justify-center"
          >
            <CvButton />
          </Animation>

          <Animation 
            delay={300}
            className="flex md:hidden justify-center"
          >
            <CvButton />
          </Animation>

          <Animation 
            delay={TOTAL_TEXT_DURATION - 400}
            className="hidden md:flex justify-center"
          >
            <ScrollButton onScrollClick={onScrollClick} />
          </Animation>

          <Animation 
            delay={400}
            className="flex md:hidden justify-center"
          >
            <ScrollButton onScrollClick={onScrollClick} />
          </Animation>
        </div>
      </section>
    );
  }
);

export default AboutSection;