import { useState } from "react";

export const useAnimationState = (letters: string[]) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLetterHover = (index: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setHoveredIndex(index);
    setIsHovered(true);
    setShouldReset(true);

    const maxDistance = Math.max(...letters.map((_, i) => Math.abs(i - index)));
    const totalDuration = maxDistance * 50 + 300;

    setTimeout(() => {
      setShouldReset(false);
      setTimeout(() => setIsAnimating(false), totalDuration);
    }, 50);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsHovered(false);
    setIsAnimating(false);
  };

  const getAnimationDelay = (index: number): string => {
    if (hoveredIndex === null) return `${index * 50}ms`;
    return `${Math.abs(index - hoveredIndex) * 50}ms`;
  };

  return {
    isHovered,
    shouldReset,
    handleLetterHover,
    handleMouseLeave,
    getAnimationDelay,
  };
};
