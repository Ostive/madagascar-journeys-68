import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  traveler_name?: string;
  review_text?: string;
  rating?: number;
}

interface ReviewsTabProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewsTab = ({ reviews, averageRating }: ReviewsTabProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
          Avis des voyageurs
        </h2>
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10">
          <Star className="w-6 h-6 fill-emerald-500 text-emerald-500" />
          <span className="text-xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({reviews.length} avis)</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {reviews.map((review, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={review.id}
            className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                  {review.traveler_name?.[0]?.toUpperCase()}
                </div>
                <span className="font-medium text-gray-900">{review.traveler_name}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50">
                <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">{review.rating}/5</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{review.review_text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReviewsTab;