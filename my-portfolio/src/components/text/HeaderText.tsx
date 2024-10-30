import { useState, useRef, FC } from 'react';
import { useScrollAnimation } from '../shared/useScrollAnimation';

interface HeaderTextProps {
  title: string;
}

const HeaderText: FC<HeaderTextProps> = ({ title }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [ref, inView] = useScrollAnimation();
  const letters = title.split('');

  const handleLetterHover = (index: number) => {
    setHoveredIndex(index);
    setIsHovered(true);
    setShouldReset(true);
    setTimeout(() => setShouldReset(false), 50);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsHovered(false);
  };

  const getAnimationDelay = (index: number): string => {
    if (hoveredIndex === null) return `${index * 50}ms`;
    const distance = Math.abs(index - hoveredIndex);
    return `${distance * 50}ms`;
  };

  return (
    <div className="py-4">
      <h2 
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className="text-5xl font-bold text-center font-['Poppins'] relative group"
      >
        <div className="relative z-10 flex justify-center items-center">
          <span
            ref={containerRef}
            className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-transparent bg-clip-text leading-relaxed"
            onMouseLeave={handleMouseLeave}
          >
            {letters.map((letter: string, index: number) => (
              <span
                key={index}
                className="inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                onMouseEnter={() => handleLetterHover(index)}
                style={{
                  transform: (!inView || shouldReset) ? 'translateY(20px)' : 'none',
                  opacity: (!inView || shouldReset) ? 0 : 1,
                  transitionDelay: getAnimationDelay(index)
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