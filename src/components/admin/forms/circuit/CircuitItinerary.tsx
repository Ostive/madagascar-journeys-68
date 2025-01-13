import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface ItineraryDay {
  day_number: number;
  activities?: string;
  travel_duration?: string;
}

interface CircuitItineraryProps {
  itinerary: ItineraryDay[];
  onItineraryChange: (newItinerary: ItineraryDay[]) => void;
}

const CircuitItinerary = ({ itinerary, onItineraryChange }: CircuitItineraryProps) => {
  const [newDay, setNewDay] = useState<ItineraryDay>({
    day_number: itinerary.length + 1,
  });

  const handleAddDay = () => {
    onItineraryChange([...itinerary, newDay]);
    setNewDay({
      day_number: itinerary.length + 2,
    });
  };

  const handleRemoveDay = (dayNumber: number) => {
    const updatedItinerary = itinerary
      .filter(day => day.day_number !== dayNumber)
      .map((day, index) => ({
        ...day,
        day_number: index + 1,
      }));
    onItineraryChange(updatedItinerary);
  };

  const handleDayChange = (
    dayNumber: number,
    field: keyof ItineraryDay,
    value: string | number
  ) => {
    const updatedItinerary = itinerary.map(day => {
      if (day.day_number === dayNumber) {
        return { ...day, [field]: value };
      }
      return day;
    });
    onItineraryChange(updatedItinerary);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Itinéraire</Label>
        <Button
          type="button"
          onClick={handleAddDay}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter un jour
        </Button>
      </div>

      <div className="space-y-8">
        {itinerary.map((day) => (
          <div key={day.day_number} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Jour {day.day_number}</h3>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveDay(day.day_number)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Activités</Label>
                <Textarea
                  value={day.activities || ""}
                  onChange={(e) => handleDayChange(day.day_number, "activities", e.target.value)}
                  placeholder="Description détaillée des activités"
                />
              </div>

              <div>
                <Label>Durée du trajet</Label>
                <Input
                  value={day.travel_duration || ""}
                  onChange={(e) => handleDayChange(day.day_number, "travel_duration", e.target.value)}
                  placeholder="Ex: 2 heures"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircuitItinerary;