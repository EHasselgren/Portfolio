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
            className=" w-10 h-10 flex items-center mt-10 animate-bounce justify-center rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 hover:from-purple-500 hover:to-cyan-700 text-white transition-all duration-200 focus:outline-none  shadow-md hover:shadow-lg"
      aria-label={`Scroll ${direction}`}
    >
      <FontAwesomeIcon
        icon={direction === "down" ? faChevronDown : faChevronUp}
        className="w-6 h-6"
      />
    </button>
  );
};
