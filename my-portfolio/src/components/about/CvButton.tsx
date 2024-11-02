import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

export const CvButton: React.FC = () => {
  return (
    <a
      href="https://ehasselgren.github.io/CV/"
      target="_blank"
      rel="noopener noreferrer"
      className="animate-pulse px-4 py-3 rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 text-white shadow-md hover:shadow-lg hover:from-purple-500 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2"
    >
      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
      View CV
    </a>
  );
};
