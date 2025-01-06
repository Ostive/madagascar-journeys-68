import { Card } from "@/components/ui/card";

interface QuizChoiceCardProps {
  title: string;
  image: string;
  selected?: boolean;
  onClick?: () => void;
}

const QuizChoiceCard = ({ title, image, selected, onClick }: QuizChoiceCardProps) => (
  <Card 
    className={`relative w-64 h-48 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    }`}
    onClick={onClick}
  >
    <div className="absolute inset-0">
      <img src={image} alt={title} className="w-full h-full object-cover rounded-lg" />
      <div className="absolute inset-0 bg-black/40 rounded-lg" />
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-white text-lg font-semibold text-center px-4">
        {title}
      </span>
    </div>
  </Card>
);

export default QuizChoiceCard;