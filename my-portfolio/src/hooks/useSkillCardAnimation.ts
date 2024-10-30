import { useSpring } from 'react-spring';

export const useSkillCardAnimation = (delay?: number) => {
  const [springProps, api] = useSpring(() => ({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: {
      tension: 300,
      friction: 10,
    },
    delay,
  }));

  const [hoverProps, hoverApi] = useSpring(() => ({
    scale: 1,
    config: {
      tension: 300,
      friction: 10,
    },
  }));

  const handleHover = (isHovered: boolean) => {
    hoverApi.start({
      scale: isHovered ? 1.05 : 1,
    });
  };

  return { springProps, hoverProps, handleHover, api };
};