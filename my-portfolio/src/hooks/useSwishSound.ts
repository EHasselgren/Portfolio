import useSound from "use-sound";

const useSwishSound = () => {
  const [playSwish] = useSound("/sounds/swish.mp3", { volume: 1 });
  return playSwish;
};

export default useSwishSound;
