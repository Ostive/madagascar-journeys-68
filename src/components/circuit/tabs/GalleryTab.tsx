import GalleryGrid from "@/components/GaleryGrid";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, TrendingUp, Clock, Camera } from "lucide-react";
import { useState } from "react";

interface GalleryTabProps {
  images: string[];
  title: string;
}

const GalleryTab = ({ images = [], title }: GalleryTabProps) => {
  // Categorize images (you'll need to adjust this based on your actual data structure)
  const allImages = images || [];
  const trendingImages = allImages.slice(0, Math.min(6, allImages.length));
  const recentImages = allImages.slice(0, Math.min(8, allImages.length));
  const popularImages = allImages.filter(img => img.includes('popular'));
  const categories = [
    { id: 'trending', label: 'Tendances', icon: TrendingUp, images: trendingImages },
    { id: 'recent', label: 'Récents', icon: Clock, images: recentImages },
    { id: 'popular', label: 'Populaires', icon: Heart, images: popularImages },
    { id: 'all', label: 'Tous', icon: Camera, images: allImages },
  ];

  const [activeTab, setActiveTab] = useState(categories[0].id);

  return (
    <div className="space-y-8">
      {/* Featured Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Galerie photos</h2>
          <div className="flex items-center gap-6">
            {categories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  "hover:text-primary focus:outline-none",
                  activeTab === id ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} />
                  <span>{label}</span>
                </div>
                {activeTab === id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map(category => (
              category.id === activeTab && (
                <div key={category.id} className="space-y-6">
                  {category.id === 'trending' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Featured Trending Item */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <img
                          src={category.images[0]}
                          alt="Featured"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={16} className="text-primary" />
                            <span className="text-sm font-medium">Tendance #1</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-1">Découverte de Madagascar</h3>
                          <p className="text-sm text-white/80">Vue plus de 1000 fois cette semaine</p>
                        </div>
                      </div>

                      {/* Trending Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {category.images.slice(1, 5).map((image, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
                            <img
                              src={image}
                              alt={`Trending ${idx + 2}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 transition-opacity hover:opacity-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regular Grid for Other Categories */}
                  <GalleryGrid
                    images={category.images}
                    title={`${title} - ${category.label}`}
                  />
                </div>
              )
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GalleryTab;