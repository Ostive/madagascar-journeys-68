import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
}

export const FAQSection = ({ faqs, onChange }: FAQSectionProps) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      onChange([...faqs, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const handleRemoveFAQ = (index: number) => {
    const updatedFAQs = faqs.filter((_, i) => i !== index);
    onChange(updatedFAQs);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">FAQs</h3>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <Input 
                value={faq.question}
                onChange={(e) => {
                  const updatedFAQs = [...faqs];
                  updatedFAQs[index].question = e.target.value;
                  onChange(updatedFAQs);
                }}
                placeholder="Question"
              />
              <Textarea 
                value={faq.answer}
                onChange={(e) => {
                  const updatedFAQs = [...faqs];
                  updatedFAQs[index].answer = e.target.value;
                  onChange(updatedFAQs);
                }}
                placeholder="Answer"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveFAQ(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Input
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="New Question"
        />
        <Textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="New Answer"
        />
        <Button
          onClick={handleAddFAQ}
          disabled={!newQuestion.trim() || !newAnswer.trim()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </div>
    </div>
  );
};