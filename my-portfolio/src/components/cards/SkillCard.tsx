import React from 'react';
import { Animation } from '../shared/Animation';

export const SkillCard: React.FC<{ title: string; delay?: number, skills: string[] }> = ({
  title,
  skills,
  delay
}) => (
  <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
    <h3 className="text-xl font-['Poppins'] text-center font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
      {title}
    </h3>
    <div className="flex flex-wrap gap-1 justify-center">
      {skills.map((skill, index) => (
        <Animation
          key={index}
          delay={delay}
          oneByOne={{
            index,
            totalItems: skills.length,
            delayBetween: 100
          }}
        >
          <span className="px-3 py-1 bg-gradient-to-br from-purple-400 to-blue-500 text-white rounded-full text-sm flex items-center justify-center min-w-[48px]">
          {skill}
          </span>
        </Animation>
      ))}
    </div>
  </div>
);