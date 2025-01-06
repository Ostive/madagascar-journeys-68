import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizNavigationProps {
  onBack: () => void;
  onNext: () => void;
  showSubmit?: boolean;
  onSubmit?: () => void;
}

const QuizNavigation = ({ onBack, onNext, showSubmit, onSubmit }: QuizNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate("/")} size="icon">
          <Home className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>
      {showSubmit ? (
        <Button onClick={onSubmit}>Envoyer</Button>
      ) : (
        <Button onClick={onNext}>
          Suivant
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default QuizNavigation;