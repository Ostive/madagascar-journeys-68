import { Progress } from "@/components/ui/progress";

interface QuizStepperProps {
  currentStep: number;
  totalSteps: number;
}

const QuizStepper = ({ currentStep, totalSteps }: QuizStepperProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <Progress value={progress} className="h-2 w-full max-w-md mx-auto" />
      <div className="mt-2 text-sm text-gray-600 text-center">
        Question {currentStep} sur {totalSteps}
      </div>
    </div>
  );
};

export default QuizStepper;