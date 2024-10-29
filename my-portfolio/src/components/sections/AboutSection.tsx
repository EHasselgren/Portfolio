import React from 'react';
import HeaderSection from '../text/HeaderSection';
import TextSection from '../text/TextSection';
import { ScrollButton } from '../buttons/ScrollButton';
import { Animation } from '../shared/Animation';
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AboutSectionProps {
  onScrollClick: () => void;
}

const text = "Hi! My name is Elias Hasselgren and I'm a Swedish Fullstack Developer specializing in React and TypeScript. I have worked in several projects and have a lot of experience working in an international environment. I'm passionate about design and customer experiences!";

export const AboutSection = React.forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ onScrollClick }, ref) => {
    return (
      <section
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-200"
      >
        <div className="max-w-3xl text-center">
          <Animation delay={0}>
            <HeaderSection title="About Me" />
          </Animation>
          <Animation delay={300}>
            <div className="my-8">
              <img
                src="/images/profile.jpg"
                alt="Elias Hasselgren"
                className="w-[15vw] h-[15vw] rounded-full object-cover mx-auto shadow-lg"
              />
            </div>
          </Animation>
          <Animation delay={600}>
            <TextSection text={text} />
          </Animation>
          <Animation delay={750} className="flex justify-center w-full mt-6">
            <a
              href="https://ehasselgren.github.io/CV_project/"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse px-6 py-3 rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 text-white shadow-md hover:shadow-lg hover:from-purple-500 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4" />
              View CV
            </a>
          </Animation>
          <Animation delay={900} className="flex justify-center w-full">
            <ScrollButton onScrollClick={onScrollClick} />
          </Animation>
        </div>
      </section>
    );
  }
);