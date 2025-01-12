import { useState, useEffect } from "react";

interface HeroBackgroundProps {
  images: string[];
  currentImage: number;
}

const HeroBackground = ({ images, currentImage }: HeroBackgroundProps) => {
  return (
    <div className="absolute inset-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Madagascar paysage ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </div>
  );
};

export default HeroBackground;