import useSound from "use-sound";

export const useSwishSound = () => {
  const [playSwish] = useSound("/sounds/swish.mp3", { volume: 0.1 });
  return playSwish;
};

export const useSwirlSound = () => {
  const [playSwirl] = useSound("/sounds/swirl.mp3", { volume: 0.1 });
  return playSwirl;
};

export const usePopSound = () => {
  const [playPop] = useSound("/sounds/pop.mp3", { volume: 0.1 });
  return playPop;
};
