import React from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSwishSound } from "../../hooks/soundHooks";

interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export const CarouselButton: React.FC<CarouselButtonProps> = ({
  direction,
  onClick,
}) => {
  const playSwish = useSwishSound();

  const handleClick = () => {
    playSwish();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 hover:from-purple-500 hover:to-cyan-700 text-white transition-all duration-200 focus:outline-none shadow-md hover:shadow-lg"
      aria-label={`Scroll ${direction}`}
    >
      <FontAwesomeIcon
        icon={direction === "left" ? faChevronLeft : faChevronRight}
        className="w-6 h-6"
      />
    </button>
  );
};