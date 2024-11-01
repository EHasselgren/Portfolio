import useSound from "use-sound";
import swishSound from "../assets/sounds/swish.mp3"; 
import popSound from "../assets/sounds/pop.mp3"; 

export const useSwishSound = () => {
  const [playSwish] = useSound(swishSound, { volume: 0.1 });
  return playSwish;
};

export const usePopSound = () => {
  const [playPop] = useSound(popSound, { volume: 0.1 });
  return playPop;
};
