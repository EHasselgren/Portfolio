import React, { useState, useEffect } from "react";
import { HeaderText } from "../text/HeaderText";
import ProjectCard from "./ProjectCard";
import { ScrollButton } from "../buttons/ScrollButton";
import { Animation } from "../shared/Animation";
import MunamiiCakery from "../../assets/images/munamii-cakery.png";
import Moneytracker from "../../assets/images/Moneytracker.png";
import Api from "../../assets/images/Api.png";
import AssetTracker from "../../assets/images/asset-tracker.png";
import { CarouselButton } from "../buttons/CarouselButton";

interface ProjectsSectionProps {
  onScrollClick: () => void;
}

export const ProjectsSection = React.forwardRef<HTMLDivElement, ProjectsSectionProps>(
  ({ onScrollClick }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const projects = [
      {
        title: "Munamii Cakery Frontend",
        description:
          "React-based frontend for a bakery business, featuring product showcase and ordering system",
        technologies: ["TypeScript", "React", "Tailwind CSS"],
        githubUrl: "https://github.com/EHasselgren/munamii-cakery",
        websiteUrl: "https://ehasselgren.github.io/munamii-cakery/",
        imageUrl: MunamiiCakery,
      },
      {
        title: "Money Tracker",
        description:
          "Terminal-based application for tracking personal finances, has advanced filtering and is styled using spectre.console",
        technologies: ["C#", ".NET", "spectre.console"],
        githubUrl: "https://github.com/EHasselgren/MoneyTracker",
        imageUrl: Moneytracker,
      },
      {
        title: "Munamii Cakery API",
        description:
          "Backend API service for a bakery business, handling product management and orders",
        technologies: ["JavaScript", "Express", "MongoDB", "Node.js"],
        githubUrl: "https://github.com/EHasselgren/munamii-cakery-api",
        imageUrl: Api,
      },
      {
        title: "Asset Tracker",
        description:
          "Console application for managing assets, converts prices into local currency using https://www.exchangerate-api.com/",
        technologies: ["C#", ".NET"],
        githubUrl: "https://github.com/EHasselgren/AssetTracker",
        imageUrl: AssetTracker,
      },
    ];

    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);

      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }, []);

    const nextSlide = () => {
      setIsFirstLoad(false);
      setCurrentIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    };

    const prevSlide = () => {
      setIsFirstLoad(false);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? projects.length - 1 : prevIndex - 1
      );
    };

    return (
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-200"
      >
        <Animation>
          <div className="w-full max-w-6xl flex flex-col items-center px-4">
            <Animation>
              <HeaderText title="Projects" />
            </Animation>

            {isMobile ? (
              // Mobile Carousel View
              <div className="relative w-full max-w-[90%] mx-auto">
                <div className="overflow-hidden">
                  <div className="flex">
                    <div className="w-full px-2">
                      <ProjectCard
                        {...projects[currentIndex]}
                        index={0}
                        shouldAnimate={isFirstLoad && currentIndex === 0}
                      />
                    </div>
                  </div>
                </div>

                {/* Carousel Navigation Buttons */}
                <div 
                  className="absolute left-0 top-1/2 z-10"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <CarouselButton direction="left" onClick={prevSlide} />
                </div>
                <div 
                  className="absolute right-0 top-1/2 z-10"
                  style={{ transform: 'translate(50%, -50%)' }}
                >
                  <CarouselButton direction="right" onClick={nextSlide} />
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsFirstLoad(false);
                        setCurrentIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentIndex === index
                          ? "bg-blue-600 w-4"
                          : "bg-blue-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <Animation
                    key={index}
                    oneByOne={{
                      index,
                      totalItems: projects.length,
                      delayBetween: 350,
                    }}
                  >
                    <ProjectCard
                      {...project}
                      index={index}
                      shouldAnimate={true}
                    />
                  </Animation>
                ))}
              </div>
            )}

            <Animation delay={1500}>
              <ScrollButton onScrollClick={onScrollClick} />
            </Animation>
          </div>
        </Animation>
      </section>
    );
  }
);

export default ProjectsSection;