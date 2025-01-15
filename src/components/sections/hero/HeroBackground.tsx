import { motion, AnimatePresence } from "framer-motion";

interface HeroBackgroundProps {
  images: string[];
  currentImage: number;
}

const HeroBackground = ({ images, currentImage }: HeroBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentImage]}
            alt="Madagascar landscape"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "bg-white w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBackground;