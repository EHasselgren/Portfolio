import { FC } from "react";

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: FC<AnimatedTextProps> = ({ text }) => {
  const letters = text.split("");

  return (
    <div className="inline-block">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300"
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
