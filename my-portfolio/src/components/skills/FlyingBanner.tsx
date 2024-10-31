import { FC, memo } from "react";
import { animated, useSpring } from "@react-spring/web";

interface FlyingBannerProps {
  message: string;
  isVisible: boolean;
  onComplete: () => void;
}

const FlyingBanner: FC<FlyingBannerProps> = memo(({
  message,
  isVisible,
  onComplete,
}) => {
  const springProps = useSpring({
    from: { x: "100vw", opacity: 1 },
    to: async (next) => {
      if (isVisible) {
        await next({ x: "-100vw", opacity: 1 });
        onComplete();
      }
    },
    config: { duration: 2000 },
    reset: isVisible, 
  });

  // Early return if not visible - prevents unnecessary DOM rendering
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 99999 }}
    >
      <animated.div
        style={{
          ...springProps,
          position: "absolute",
          willChange: "transform",
        }}
        className="flex items-center"
      >
        <div className="relative flex items-center">
          <div 
            className="absolute right-full top-1/2 -translate-y-1/2 w-24 h-[3px] 
                       bg-gradient-to-r from-transparent to-purple-500" 
          />
                    <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 
                       px-16 py-8 rounded-lg shadow-2xl transform -skew-x-12"
          >
            <div className="transform skew-x-12">
              <p 
                className="text-6xl font-['Press_Start_2P'] text-white 
                           whitespace-nowrap drop-shadow-lg"
              >
                {message}
              </p>
            </div>
          </div>
          <div 
            className="absolute left-full top-1/2 -translate-y-1/2 w-24 h-[3px] 
                       bg-gradient-to-l from-transparent to-blue-500" 
          />
        </div>
      </animated.div>
    </div>
  );
});

export default FlyingBanner;