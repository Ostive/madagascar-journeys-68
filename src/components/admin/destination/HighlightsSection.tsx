import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface HighlightsSectionProps {
  selectedHighlights: string[];
  customHighlights?: string[];
  onHighlightsChange: (highlights: string[]) => void;
  onCustomHighlightsChange?: (customHighlights: string[]) => void;
}

export const HighlightsSection = ({
  selectedHighlights,
  customHighlights = [],
  onHighlightsChange,
  onCustomHighlightsChange,
}: HighlightsSectionProps) => {
  const [availableHighlights, setAvailableHighlights] = useState<{ id: number; description: string; }[]>([]);
  const [newCustomHighlight, setNewCustomHighlight] = useState("");

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

  const handleAddCustomHighlight = () => {
    if (newCustomHighlight.trim() && onCustomHighlightsChange) {
      onCustomHighlightsChange([...customHighlights, newCustomHighlight.trim()]);
      setNewCustomHighlight("");
    }
  };

  const handleRemoveCustomHighlight = (index: number) => {
    if (onCustomHighlightsChange) {
      const updatedCustomHighlights = [...customHighlights];
      updatedCustomHighlights.splice(index, 1);
      onCustomHighlightsChange(updatedCustomHighlights);
    }
  };

  if (availableHighlights.length === 0) {
    return (
      <div className="space-y-4">
        <label className="text-sm font-medium">Points forts</label>
        <p className="text-sm text-muted-foreground">Pas encore de points forts à sélectionner.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium">Points forts prédéfinis</label>
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

      <div className="space-y-4">
        <label className="text-sm font-medium">Points forts personnalisés</label>
        <div className="flex gap-2">
          <Input
            value={newCustomHighlight}
            onChange={(e) => setNewCustomHighlight(e.target.value)}
            placeholder="Ajouter un point fort personnalisé"
          />
          <Button
            type="button"
            size="icon"
            onClick={handleAddCustomHighlight}
            disabled={!newCustomHighlight.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {customHighlights.map((highlight, index) => (
            <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
              <span className="text-sm">{highlight}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCustomHighlight(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};