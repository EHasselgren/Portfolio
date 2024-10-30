import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Animation } from "../shared/Animation";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  delay,
}) => {
  return (
    <div className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:scale-105 transform">
      <div className="relative w-full h-40 mb-3 overflow-hidden rounded-lg">
        <LazyLoadImage
          src={imageUrl}
          alt={title}
          effect="blur"
          className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
        />
      </div>
      <h3 className="text-lg font-['Poppins'] text-center font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-black mb-3 font-['Poppins'] text-center text-md line-clamp-2">
        {description}
      </p>
      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {technologies.map((tech, index) => (
          <Animation
            key={index}
            delay={delay}
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
