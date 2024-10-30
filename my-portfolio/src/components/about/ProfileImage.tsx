import React, { useCallback, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useSound from "use-sound";

interface ProfileImageProps {
  src: string;
  alt: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const rotationRef = useRef(0);
  const scaleRef = useRef(1);
  const isAnimatingRef = useRef(false);
  const animationFrameRef = useRef<number>();
  const soundIntervalRef = useRef<number>();
  const [playSwirl, { stop, sound }] = useSound("/sounds/swirl.mp3", {
    volume: 1,
    interrupt: true,
  });

  const ROTATION_SPEED = 2;
  const SCALE_SPEED = 0.004;
  const MAX_SCALE = 1.6;

  const stopSound = useCallback(() => {
    if (soundIntervalRef.current) {
      window.clearInterval(soundIntervalRef.current);
      soundIntervalRef.current = undefined;
    }
    stop();
    if (sound) {
      sound.volume(1);
    }
  }, [stop, sound]);

  const animate = () => {
    if (isAnimatingRef.current) {
      rotationRef.current += ROTATION_SPEED;
      scaleRef.current = Math.min(scaleRef.current + SCALE_SPEED, MAX_SCALE);

      setRotation(rotationRef.current);
      setScale(scaleRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseEnter = () => {
    isAnimatingRef.current = true;
    playSwirl();
    animate();
  };

  const handleMouseLeave = () => {
    isAnimatingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    stopSound();

    const startRotation = rotationRef.current;
    let progress = 0;

    const reverseAnimate = () => {
      progress += ROTATION_SPEED;
      const remaining = Math.max(startRotation - progress, 0);

      rotationRef.current = remaining;
      scaleRef.current = Math.max(scaleRef.current - SCALE_SPEED, 1);

      setRotation(rotationRef.current);
      setScale(scaleRef.current);

      if (remaining > 0 || scaleRef.current > 1) {
        animationFrameRef.current = requestAnimationFrame(reverseAnimate);
      } else {
        rotationRef.current = 0;
        scaleRef.current = 1;
        setRotation(0);
        setScale(1);
      }
    };

    animationFrameRef.current = requestAnimationFrame(reverseAnimate);
  };

  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopSound();
    };
  }, [stopSound]);

  return (
    <div className="my-8">
      <LazyLoadImage
        src={src}
        alt={alt}
        className="w-[15vw] h-[15vw] rounded-full object-cover mx-auto shadow-xl transition-all duration-100 hover:shadow-2xl"
        style={{
          transform: `rotate(${rotation}deg) scale(${scale})`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};
