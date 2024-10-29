import React from 'react';

interface HeaderSectionProps {
  title: string;
  Icon?: React.ElementType;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, Icon }) => {
  return (
    <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 text-transparent text-center mb-2 pb-2 bg-clip-text font-['Poppins']">
      {Icon && <Icon className="inline mr-2 mb-1" />}
      {title}
    </h2>
  );
};

export default HeaderSection;
