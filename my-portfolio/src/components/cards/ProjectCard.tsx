import React from 'react';
import { Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
}) => {
  return (
    <div className="group p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
        <img
          src={imageUrl || "/api/placeholder/400/320"}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 hover:scale-110"
        />
      </div>
      
      <h3 className="text-xl font-['Space_Grotesk'] text-center font-semibold mb-4 text-slate-600">
        {title}
      </h3>
      <p className="text-slate-600 mb-4 text-center">
        {description}
      </p>
      <div className="flex flex-wrap gap-1 justify-center mb-4">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-400 text-white rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <Github size={24} className="text-slate-600" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;