import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CardCarousel = ({ 
  items = [],
  CardComponent,
  title = "Items similaires",
  className = "",
  itemPropName = "destination", // New prop to specify the prop name (e.g., 'destination', 'circuit', 'post')
  cardProps = {},
  cardWidth = "w-80"
}) => {
  const scrollContainer = React.useRef(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 300;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!items?.length || !CardComponent) {
    return null;
  }

  return (
    <div className={`mt-12 ${className}`}>
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg hidden md:block"
          aria-label="Previous items"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={scrollContainer}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex-none ${cardWidth}`}
              style={{ scrollSnapAlign: "start" }}
            >
              <CardComponent {...cardProps} {...{ [itemPropName]: item }} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg hidden md:block"
          aria-label="Next items"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;
