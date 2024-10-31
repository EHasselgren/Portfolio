import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ProfileImageProps {
  src: string;
  alt: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => {
  return (
    <div className="my-8">
      <LazyLoadImage
        src={src}
        alt={alt}
        className="w-[15vw] h-[15vw] rounded-full object-cover mx-auto shadow-xl transition-all duration-100 hover:shadow-2xl"
      />
    </div>
  );
};