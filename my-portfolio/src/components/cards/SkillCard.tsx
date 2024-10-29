import React from 'react';

export const SkillCard: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => (
  <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
    <h3 className="text-xl font-['Space_Grotesk'] text-center font-semibold mb-4 text-slate-600">
      {title}
    </h3>
    <div className="flex flex-wrap gap-1 justify-center">
      {skills.map((skill, index) => (
        <span 
          key={index} 
          className="px-3 py-1 bg-blue-400 text-white rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);