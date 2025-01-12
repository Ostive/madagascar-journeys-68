import { useState, useEffect } from "react";
import HeroContent from "./sections/hero/HeroContent";
import HeroBackground from "./sections/hero/HeroBackground";

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
      <HeroBackground images={images} currentImage={currentImage} />
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <HeroContent />
      </div>
    </div>
  );
};

export default HeroSection;