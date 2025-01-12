import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CircuitLogisticsProps {
  formData: {
    departure_location: string;
    departure_time: string;
    return_time: string;
    dress_code: string;
    tour_location: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CircuitLogistics = ({ formData, handleChange }: CircuitLogisticsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Lieu de départ</Label>
        <Input
          name="departure_location"
          value={formData.departure_location}
          onChange={handleChange}
          placeholder="Ex: Bureau de poste / Parc de la ville"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Heure de départ</Label>
        <Input
          name="departure_time"
          value={formData.departure_time}
          onChange={handleChange}
          placeholder="Ex: Arrivée à 9h15 pour un départ à 9h30"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Heure de retour</Label>
        <Input
          name="return_time"
          value={formData.return_time}
          onChange={handleChange}
          placeholder="Ex: Environ 17h30"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Code vestimentaire</Label>
        <Textarea
          name="dress_code"
          value={formData.dress_code}
          onChange={handleChange}
          placeholder="Ex: Tenue décontractée, vêtements de sport confortables..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Lieu du circuit</Label>
        <Textarea
          name="tour_location"
          value={formData.tour_location}
          onChange={handleChange}
          placeholder="Description détaillée du lieu du circuit"
          required
        />
      </div>
    </div>
  );
};

export default CircuitLogistics;