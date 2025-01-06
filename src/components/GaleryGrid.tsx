import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react";
import { useState, useEffect } from "react";

const GalleryGrid = ({ images = [], title = "Gallery" }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

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
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const ImageContainer = ({ image, index, onClick, className = "" }) => (
    <div className={`relative group overflow-hidden rounded-lg ${className}`}>
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
      <button
        onClick={onClick}
        className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Maximize size={16} />
      </button>
    </div>
  );

  const FullscreenModal = () => (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 text-white">
        <button
          onClick={() => setIsFullscreen(false)}
          className="p-2 hover:bg-white/10 rounded-full"
        >
          <X size={24} />
        </button>
        <span className="text-sm">
          {selectedImage + 1} / {images.length}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center relative p-4">
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="w-full h-full flex items-center justify-center">
          <img
            src={images[selectedImage]}
            alt={`${title} - ${selectedImage + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/api/placeholder/400/400";
              target.alt = "Image failed to load";
            }}
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );

  const MobileCarousel = () => (
    <div className="relative h-64 w-full">
      <div className="absolute inset-0">
        <img
          src={images[selectedImage]}
          alt={`${title} - ${selectedImage + 1}`}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/api/placeholder/400/400";
            target.alt = "Image failed to load";
          }}
        />
      </div>
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={handlePrev}
              className="p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-1.5 h-1.5 rounded-full ${
                  selectedImage === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
      <button
        onClick={() => setIsFullscreen(true)}
        className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70"
      >
        <Maximize size={16} />
      </button>
    </div>
  );

  const DesktopGrid = () => {
    const displayImages = images.slice(0, 5);
    const remainingCount = Math.max(0, images.length - 5);

    return (
      <div className="relative">
        <div className="grid gap-2 grid-cols-2 h-[32rem]">
          <div className="h-full">
            <ImageContainer
              image={displayImages[0]}
              index={0}
              onClick={() => {
                setSelectedImage(0);
                setIsFullscreen(true);
              }}
              className="h-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {displayImages.slice(1).map((image, index) => (
              <ImageContainer
                key={index + 1}
                image={image}
                index={index + 1}
                onClick={() => {
                  setSelectedImage(index + 1);
                  setIsFullscreen(true);
                }}
                className="h-full"
              />
            ))}
          </div>
        </div>
        {remainingCount > 0 && (
          <button
            onClick={() => {
              setSelectedImage(5);
              setIsFullscreen(true);
            }}
            className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/60 text-white text-sm rounded-lg hover:bg-black/80 transition-all"
          >
            +{remainingCount} more
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {isMobileView ? <MobileCarousel /> : <DesktopGrid />}
      {isFullscreen && <FullscreenModal />}
    </div>
  );
};

export default GalleryGrid;