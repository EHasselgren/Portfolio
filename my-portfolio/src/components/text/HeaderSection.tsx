import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface HeaderSectionProps {
  title: string;
  Icon?: IconDefinition;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title }) => {
  return (
    <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 text-transparent text-center mb-2 pb-2 bg-clip-text font-['Poppins']">
      {title}
    </h2>
  );
};

export default HeaderSection;
