import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeaderSection from "../text/HeaderSection";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calculateAnimationDuration } from "../../utils/animationUtils";
import AnimatedText  from "../text/AnimatedText";

interface AboutSectionProps {
  onScrollClick: () => void;
}

const text = "Hi! My name is Elias Hasselgren and I'm a Swedish Fullstack Developer specializing in React and TypeScript. I have worked in several projects and have a lot of experience working in an international environment. I'm passionate about design and customer experiences!";

export const AboutSection = React.forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ onScrollClick }, ref) => {
    const TOTAL_TEXT_DURATION = calculateAnimationDuration(text);

    return (
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-200"
      >
        <div className="max-w-3xl text-center">
          <Animation delay={0}>
            <HeaderSection title="About Me" />
          </Animation>
          
          <Animation delay={300}>
            <div className="my-8">
              <LazyLoadImage
                src="/images/profile.jpg"
                title="Elias Hasselgren"
                className="w-[15vw] h-[15vw] rounded-full object-cover mx-auto shadow-xl"
              />
            </div>
          </Animation>
          <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-transparent bg-clip-text text-xl mb-4 font-['Poppins']">
          <AnimatedText text={text} />
</div>
          <Animation delay={TOTAL_TEXT_DURATION - 800} className="flex justify-center">
            <a
              href="https://ehasselgren.github.io/CV_project/"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse px-4 py-3 rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 text-white shadow-md hover:shadow-lg hover:from-purple-500 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
              View CV
            </a>
          </Animation>

          <Animation delay={TOTAL_TEXT_DURATION - 400} className="flex justify-center">
            <ScrollButton onScrollClick={onScrollClick} />
          </Animation>
        </div>
      </section>
    );
  }
);