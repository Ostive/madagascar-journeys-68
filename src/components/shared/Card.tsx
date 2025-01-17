import { motion } from "framer-motion";
import { Star, MapPin, Clock, Calendar, Heart, User2, ArrowRight } from "lucide-react";
import { useState } from "react";

interface CardProps {
  type: 'destination' | 'circuit' | 'blog';
  data: any;
  index: number;
  onClick: () => void;
}

const Card = ({ type, data, index, onClick }: CardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Image with Overlay Info */}
      <div className="relative rounded-3xl overflow-hidden mb-6">
        {/* Like Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        >
          <Heart 
            className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </button>

        <img
          src={data.image}
          alt={data.title}
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-bold text-white mb-3">
            {data.title}
          </h3>
          <div className="flex items-center gap-4 text-white/90 mb-4">
            {type === 'destination' && (
              <>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{data.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{data.duration}</span>
                </div>
              </>
            )}
            {type === 'circuit' && (
              <>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{data.startLocation}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{data.duration}</span>
                </div>
              </>
            )}
            {type === 'blog' && (
              <>
                <div className="flex items-center">
                  <User2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">{data.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">{data.date}</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            {type !== 'blog' && (
              <div>
                <span className="text-sm text-white/80">À partir de</span>
                <p className="text-2xl font-bold text-white">{data.price}</p>
              </div>
            )}
            <div className="flex items-center text-white group-hover:text-emerald-400 transition-colors">
              <span className="text-sm font-medium">
                {type === 'blog' ? 'Lire l\'article' : type === 'destination' ? 'Découvrir' : 'Réserver'}
              </span>
              <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Below */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-900">{data.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({data.reviews})</span>
          </div>
          {type === 'circuit' && (
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 text-emerald-500 mr-2" />
              <span className="text-sm">Prochain départ: {data.nextDeparture}</span>
            </div>
          )}
        </div>

        {/* Tags/Highlights */}
        <div className="flex flex-wrap gap-2">
          {(type === 'destination' ? data.tags : type === 'circuit' ? data.highlights : data.tags)?.map((item: string, i: number) => (
            <span 
              key={i} 
              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Blog Description */}
        {type === 'blog' && data.description && (
          <p className="mt-4 text-gray-600 line-clamp-2">{data.description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
