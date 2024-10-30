import React, { useState } from 'react';
import { useScrollAnimation } from '../shared/useScrollAnimation';

interface HeaderTextProps {
  title: string;
}

const HeaderText: React.FC<HeaderTextProps> = ({ title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useScrollAnimation();
  const letters = title.split('');

  return (
    <div className="py-4">
      <h2
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className="text-5xl font-bold text-center font-['Poppins'] relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative z-10 flex justify-center items-center">
          <span className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-transparent bg-clip-text leading-relaxed">
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 ${
                  isHovered ? 'transform hover:scale-110 hover:-translate-y-1' : ''
                }`}
                style={{
                  transform: !inView ? 'translateY(20px)' : 'none',
                  opacity: !inView ? 0 : 1,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </div>
        <div
          className={`absolute inset-0 bg-gradient-to-r from-purple-200/20 to-cyan-200/20 blur-xl rounded-lg transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </h2>
    </div>
  );
};

export default HeaderText;