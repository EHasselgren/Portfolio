import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, technologies }) => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
      <h3 className="text-xl font-['Space_Grotesk'] text-center font-semibold mb-4 text-slate-600">
        {title}
      </h3>
      <p className="text-slate-600 mb-4 text-center">
        {description}
      </p>
      <div className="flex flex-wrap gap-1 justify-center">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-400 text-white rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;