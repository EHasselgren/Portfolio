import React from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSwishSound } from "../../hooks/soundHooks";

interface ScrollButtonProps {
  onScrollClick: () => void;
  direction?: "up" | "down";
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({
  onScrollClick,
  direction = "down",
}) => {
  const playSwish = useSwishSound();

  const playFourSwish = async () => {
    const delays = [0, 150, 300, 450];

    const soundPromises = delays.map(
      (delay) =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            playSwish();
            resolve();
          }, delay);
        })
    );

    await Promise.all(soundPromises);
  };

  const handleClick = () => {
    if (direction === "down") {
      playSwish();
    } else {
      playFourSwish();
    }
    onScrollClick();
  };

  return (
    <button
      onClick={handleClick}
      className="animate-bounce w-12 h-12 rounded-full mt-8 bg-gradient-to-br from-purple-400 to-cyan-600 text-white shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
      aria-label={`Scroll ${direction}`}
    >
      <FontAwesomeIcon
        icon={direction === "down" ? faChevronDown : faChevronUp}
        className="w-6 h-6"
      />
    </button>
  );
};
