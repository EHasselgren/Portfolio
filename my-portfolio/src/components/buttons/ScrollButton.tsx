import React from "react";
import { ChevronDown } from "lucide-react";

interface ScrollButtonProps {
  onScrollClick: () => void;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({ onScrollClick }) => {
  return (
    <button
      onClick={onScrollClick}
      className="animate-bounce p-2 rounded-full mt-8 bg-gradient-to-br from-purple-400 to-cyan-600 text-white shadow-md hover:shadow-lg transition-shadow duration-300"
      aria-label="Scroll down"
    >
      <ChevronDown className="w-6 h-6" />
    </button>
  );
};