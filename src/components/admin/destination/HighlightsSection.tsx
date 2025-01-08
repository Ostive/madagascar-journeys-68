import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

interface HighlightsSectionProps {
  selectedHighlights: string[];
  onHighlightsChange: (highlights: string[]) => void;
}

export const HighlightsSection = ({
  selectedHighlights,
  onHighlightsChange,
}: HighlightsSectionProps) => {
  const [availableHighlights, setAvailableHighlights] = useState<{ id: number; description: string; }[]>([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      const { data, error } = await supabase
        .from('highlights')
        .select('id, description');
      
      if (error) {
        console.error('Error fetching highlights:', error);
        return;
      }
      
      setAvailableHighlights(data);
    };

    fetchHighlights();
  }, []);

  if (availableHighlights.length === 0) {
    return (
      <div className="space-y-4">
        <label className="text-sm font-medium">Points forts</label>
        <p className="text-sm text-muted-foreground">Pas encore de points forts à sélectionner.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Points forts</label>
      <div className="grid grid-cols-2 gap-4">
        {availableHighlights.map((highlight) => (
          <div key={highlight.id} className="flex items-center space-x-2">
            <Checkbox
              id={`highlight-${highlight.id}`}
              checked={selectedHighlights.includes(highlight.description)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onHighlightsChange([...selectedHighlights, highlight.description]);
                } else {
                  onHighlightsChange(
                    selectedHighlights.filter((h) => h !== highlight.description)
                  );
                }
              }}
            />
            <label
              htmlFor={`highlight-${highlight.id}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {highlight.description}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};