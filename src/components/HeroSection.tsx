import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Search, MapPin, Users, Calendar } from 'lucide-react';
import SearchSection from "@/components/SearchSection";
const images = [
  "https://cedar-cdn-aws-webp.s3.eu-central-1.amazonaws.com/app/uploads/2020/10/24070404/Western-Madagascar-avenue-de-baobabs-SS-705245614-1920.jpg",
  "https://madagascar-tourisme.com/wp-content/uploads/2017/04/33879604103_f0de969da2_k.jpg",
  "https://static.edenviaggi.it/.imaging/default/dam/edenviaggi.it/img/escursioni/madagascar/1900x1070-.png/jcr:content.png",
  "https://carter.eu/wp-content/uploads/2023/11/tsarabanjina-madagascar-aerial-view-20-1536x1024.jpg",
  "https://andilanaresort.com/2018/public/images/131_escursioni-arcipelago-0.jpg",
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen pb-24 pt-14 md:pt-0">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentImage === index ? "opacity-100" : "opacity-0"
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

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="max-w-3xl text-center animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
            Découvrez la magie de Madagascar
          </h1>
          <p className="text-xl text-white/90 font-opensans mb-12">
            Une île unique où nature exceptionnelle et culture authentique se rencontrent
          </p>

          <SearchSection />


        </div>
      </div>
    </div>
  );
};

export default HeroSection;