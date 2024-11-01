import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import profile from "../../assets/images/profile.png";

interface ProfileImageProps {
  alt: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ alt }) => {
  return (
    <div className="my-8 flex justify-center">
      <LazyLoadImage
        src={profile}
        alt={alt}
        className="w-48 h-48 md:w-[15vw] md:h-[15vw] rounded-full object-cover shadow-xl transition-all duration-100 hover:shadow-2xl"
        effect="blur"
      />
    </div>
  );
};