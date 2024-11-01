import { FC, ReactNode } from "react";

interface AnimatedTextContainerProps {
  children: ReactNode;
  isHovered: boolean;
  onMouseLeave: () => void;
}

export const AnimatedTextContainer: FC<AnimatedTextContainerProps> = ({
  children,
  isHovered,
  onMouseLeave,
}) => (
  <div className="py-4">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center font-['Poppins'] relative group">
      <div className="relative z-10 flex justify-center items-center">
        <span
          className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text leading-relaxed"
          onMouseLeave={onMouseLeave}
        >
          {children}
        </span>
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 blur-xl rounded-lg transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </h2>
  </div>
);