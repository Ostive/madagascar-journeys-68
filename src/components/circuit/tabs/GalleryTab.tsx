import GalleryGrid from "@/components/GaleryGrid";
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
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
          Galerie photos
        </h2>
        <div className="flex items-center gap-2">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-all rounded-xl",
                "hover:bg-emerald-50 hover:text-emerald-600",
                "flex items-center gap-2",
                activeTab === id 
                  ? "text-emerald-600 bg-emerald-50" 
                  : "text-gray-500"
              )}
            >
              <Icon className={cn(
                "w-4 h-4 transition-transform",
                activeTab === id && "scale-110"
              )} />
              <span>{label}</span>
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
          className="space-y-8"
        >
          {categories.map(category => (
            category.id === activeTab && (
              <div key={category.id} className="space-y-8">
                {category.id === 'trending' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Featured Image */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                      <img
                        src={category.images[0]}
                        alt="Featured"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                              <TrendingUp size={14} className="text-emerald-400" />
                              <span className="text-sm font-medium text-emerald-300">Tendance #1</span>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-1">Découverte de Madagascar</h3>
                        <p className="text-sm text-white/80">Vue plus de 1000 fois cette semaine</p>
                      </div>
                    </div>

                    {/* Trending Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {category.images.slice(1, 5).map((image, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                          <img
                            src={image}
                            alt={`Trending ${idx + 2}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.images.map((image, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden group"
                    >
                      <img
                        src={image}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GalleryTab;