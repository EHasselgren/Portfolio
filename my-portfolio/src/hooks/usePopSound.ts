import useSound from "use-sound";

const usePopSound = () => {
  const [playPop] = useSound("/sounds/pop.mp3", { volume: 1 });
  return playPop;
};

export default usePopSound;
