import React from "react";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ScrollButtonProps {
  onScrollClick: () => void;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({ onScrollClick }) => {
  return (
    <button
      onClick={onScrollClick}
      className="animate-bounce p-3 rounded-full mt-8 bg-gradient-to-br from-purple-400 to-cyan-600 text-white shadow-md hover:shadow-lg transition-shadow duration-300 w-12 h-12 flex items-center justify-center"
      aria-label="Scroll down"
    >
      <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5" />
    </button>
  );
};