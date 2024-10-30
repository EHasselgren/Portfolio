import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Animation } from "../shared/Animation";
import AnimatedText from "../text/AnimatedText";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  delay: number;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  index,
}) => {
  const stepDelay = 300;

  // Calculate delays based on card index and step sequence
  const cardDelay = index * stepDelay;
  const imageDelay = cardDelay + stepDelay;
  const titleDelay = cardDelay + stepDelay * 2;
  const descDelay = cardDelay + stepDelay * 3;
  const techDelay = cardDelay + stepDelay * 4;

  return (
    <div className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:scale-105 transform">
      <Animation delay={imageDelay}>
        <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
          <LazyLoadImage
            src={imageUrl}
            alt={title}
            effect="blur"
            className="object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
          />
        </div>
      </Animation>

      <Animation delay={titleDelay}>
        <h3 className="text-lg font-['Poppins'] text-center font-semibold mb-1 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          {title}
        </h3>
      </Animation>

      <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-transparent bg-clip-text font-['Poppins'] text-black mb-3 text-center line-clamp-2">
        <AnimatedText text={description} delay={descDelay} />
      </div>

      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {technologies.map((tech, index) => (
          <Animation
            key={index}
            delay={techDelay}
            oneByOne={{
              index,
              totalItems: technologies.length,
              delayBetween: 100,
            }}
          >
            <span className="px-3 py-1 bg-gradient-to-br from-purple-400 to-blue-500 text-white rounded-full text-sm flex items-center justify-center min-w-[48px]">
              {tech}
            </span>
          </Animation>
        ))}
      </div>

      <div className="flex justify-center scale-0 group-hover:scale-100 transition-all duration-300 origin-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-pulse w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 hover:from-purple-500 hover:to-cyan-700 text-white shadow-md hover:shadow-lg"
        >
          <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;