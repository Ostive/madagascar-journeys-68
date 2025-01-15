import { ChevronLeft, ChevronRight, Maximize, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const GalleryGrid = ({ images = [], title = "Gallery" }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!images || images.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-48 bg-gray-100/50 rounded-xl flex items-center justify-center"
      >
        <p className="text-muted-foreground">Aucune image à afficher</p>
      </motion.div>
    );
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const ImageContainer = ({ image, index, onClick, className = "" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative group overflow-hidden rounded-xl",
        "transform transition-transform duration-500 hover:scale-[1.02]",
        className
      )}
      onHoverStart={() => setHoveredImage(index)}
      onHoverEnd={() => setHoveredImage(null)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0">
        <img
          src={image}
          alt={`${title} - ${index + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/api/placeholder/400/400";
            target.alt = "Image failed to load";
          }}
        />
      </div>
      <motion.div
        initial={false}
        animate={{ opacity: hoveredImage === index ? 1 : 0 }}
        className="absolute inset-0 p-4 flex flex-col justify-between"
      >
        <div className="flex justify-end">
          <button
            onClick={(e) => toggleLike(index, e)}
            className={cn(
              "p-2 rounded-full backdrop-blur-sm transition-all duration-300",
              "hover:scale-110 hover:bg-white/20",
              likedImages.has(index) ? "bg-primary text-white" : "bg-black/30 text-white"
            )}
          >
            <Heart size={20} className={likedImages.has(index) ? "fill-current" : ""} />
          </button>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex-1" />
          <button
            onClick={onClick}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white transform transition-all duration-300 hover:scale-110 hover:bg-white/20"
          >
            <Maximize size={20} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const FullscreenModal = () => (
    <AnimatePresence>
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex flex-col backdrop-blur-lg"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center p-6 text-white"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => toggleLike(selectedImage, e)}
                className={cn(
                  "p-2 rounded-full backdrop-blur-sm transition-all duration-300",
                  "hover:scale-110",
                  likedImages.has(selectedImage) ? "bg-primary text-white" : "bg-white/10 text-white"
                )}
              >
                <Heart size={20} className={likedImages.has(selectedImage) ? "fill-current" : ""} />
              </button>
              <span className="text-sm font-medium">
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          </motion.div>

          <div className="flex-1 flex items-center justify-center relative p-4">
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  onClick={handlePrev}
                  className="absolute left-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  onClick={handleNext}
                  className="absolute right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </>
            )}

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={images[selectedImage]}
                alt={`${title} - ${selectedImage + 1}`}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/400/400";
                  target.alt = "Image failed to load";
                }}
              />
            </motion.div>
          </div>

          {/* Thumbnail Navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 flex justify-center gap-2 overflow-x-auto"
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300",
                  "hover:scale-105",
                  selectedImage === idx ? 'ring-2 ring-primary scale-105' : 'opacity-50 hover:opacity-100'
                )}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <ImageContainer
            key={index}
            image={image}
            index={index}
            onClick={() => {
              setSelectedImage(index);
              setIsFullscreen(true);
            }}
            className={cn(
              index === 0 && "md:col-span-2 md:row-span-2",
              index === 1 && "md:row-span-2",
              "aspect-[3/4]"
            )}
          />
        ))}
      </div>
      <FullscreenModal />
    </>
  );
};

export default GalleryGrid;