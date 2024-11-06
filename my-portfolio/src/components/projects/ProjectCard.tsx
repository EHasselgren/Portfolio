import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Animation } from "../shared/Animation";
import AnimatedText from "../text/ScrollWordAnimatedText";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  websiteUrl?: string; 
  index: number;
  shouldAnimate?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  websiteUrl,
  index,
  shouldAnimate = false,
}) => {
  const stepDelay = 300;
  const cardDelay = index * stepDelay;
  const imageDelay = cardDelay + stepDelay;
  const titleDelay = cardDelay + stepDelay * 2;
  const descDelay = cardDelay + stepDelay * 3;
  const techDelay = cardDelay + stepDelay * 4;

  const handleGithubButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(githubUrl, '_blank', 'noopener noreferrer');
  };

  const handleCardClick = () => {
    const url = websiteUrl || githubUrl;
    window.open(url, '_blank', 'noopener noreferrer');
  };

  const Content = () => (
    <>
      <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
        <LazyLoadImage
          src={imageUrl}
          alt={title}
          effect="blur"
          className="object-cover transition-all duration-500 filter lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-110"
        />
      </div>

      <h3 className="text-lg sm:text-xl md:text-2xl font-['Poppins'] text-center font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
        {title}
      </h3>

      <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-transparent bg-clip-text font-['Poppins'] text-black mb-3 text-center line-clamp-2">
        {shouldAnimate ? (
          <AnimatedText text={description} delay={descDelay} />
        ) : (
          description
        )}
      </div>
      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {technologies.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="px-3 py-1 bg-gradient-to-br from-purple-400 to-blue-500 text-white rounded-full text-sm flex items-center justify-center min-w-[48px]"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-center scale-100 lg:scale-0 lg:group-hover:scale-100 transition-all duration-300 origin-center">
        <button
          onClick={handleGithubButtonClick}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 hover:from-purple-500 hover:to-cyan-700 text-white shadow-md hover:shadow-lg animate-pulse lg:animate-none lg:group-hover:animate-pulse"
        >
          <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
        </button>
      </div>
    </>
  );

  return (
    <div
      onClick={handleCardClick}
      className="block group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 lg:hover:scale-105 transform cursor-pointer"
    >
      {shouldAnimate ? (
        <>
          <Animation delay={imageDelay}>
            <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
              <LazyLoadImage
                src={imageUrl}
                alt={title}
                effect="blur"
                className="object-cover transition-all duration-500 filter lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-110"
              />
            </div>
          </Animation>

          <Animation delay={titleDelay}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-['Poppins'] text-center font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
              {title}
            </h3>
          </Animation>

          <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-transparent bg-clip-text font-['Poppins'] text-black mb-3 text-center line-clamp-2">
            <AnimatedText text={description} delay={descDelay} />
          </div>

          <div className="flex flex-wrap gap-1 justify-center mb-3">
            {technologies.map((tech, techIndex) => (
              <Animation
                key={techIndex}
                delay={techDelay}
                oneByOne={{
                  index: techIndex,
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
          <div className="flex justify-center scale-100 lg:scale-0 lg:group-hover:scale-100 transition-all duration-300 origin-center">
            <button
              onClick={handleGithubButtonClick}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 hover:from-purple-500 hover:to-cyan-700 text-white shadow-md hover:shadow-lg animate-pulse lg:animate-none lg:group-hover:animate-pulse"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <Content />
      )}
    </div>
  );
};

export default ProjectCard;