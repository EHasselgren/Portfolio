import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import swishSound from "../assets/sounds/swish.mp3";
import popSound from "../assets/sounds/pop.mp3";

const useSoundEnabled = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const enableSound = () => {
      setIsEnabled(true);
      document.removeEventListener('touchstart', enableSound);
      document.removeEventListener('click', enableSound);
    };

    document.addEventListener('touchstart', enableSound);
    document.addEventListener('click', enableSound);

    return () => {
      document.removeEventListener('touchstart', enableSound);
      document.removeEventListener('click', enableSound);
    };
  }, []);

  return isEnabled;
};

export const useSwishSound = () => {
  const isEnabled = useSoundEnabled();
  const [playSwish] = useSound(swishSound, {
    volume: 0.1,
    soundEnabled: isEnabled,
    html5: true, 
    interrupt: true 
  });

  return playSwish;
};

export const usePopSound = () => {
  const isEnabled = useSoundEnabled();
  const [playPop] = useSound(popSound, {
    volume: 0.1,
    soundEnabled: isEnabled,
    html5: true,
    interrupt: true
  });

  return playPop;
};