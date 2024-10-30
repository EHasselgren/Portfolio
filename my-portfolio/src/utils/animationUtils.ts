export const WORD_DELAY = 50;
export const TEXT_START_DELAY = 800;

export const calculateAnimationDuration = (text: string) => {
  const words = text.split(" ");
  return TEXT_START_DELAY + (words.length * WORD_DELAY);
};