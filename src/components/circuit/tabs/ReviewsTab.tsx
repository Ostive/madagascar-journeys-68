import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Reviews</CardTitle>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{review.traveler_name}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{review.rating}/5</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.review_text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsTab;