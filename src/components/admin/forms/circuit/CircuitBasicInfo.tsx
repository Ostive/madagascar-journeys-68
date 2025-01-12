import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CircuitBasicInfoProps {
  formData: {
    name: string;
    description: string;
    long_description: string;
    duration_days: number;
    persons: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CircuitBasicInfo = ({ formData, handleChange }: CircuitBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Titre</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Entrez le titre du circuit"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Description courte</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Entrez une brève description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Description longue</Label>
        <Textarea
          name="long_description"
          value={formData.long_description}
          onChange={handleChange}
          placeholder="Entrez la description détaillée"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Durée (jours)</Label>
        <Input
          type="number"
          name="duration_days"
          value={formData.duration_days}
          onChange={handleChange}
          placeholder="Ex: 7 jours"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Nombre de personnes</Label>
        <Input
          name="persons"
          value={formData.persons}
          onChange={handleChange}
          placeholder="Ex: 2-8 personnes"
          required
        />
      </div>
    </div>
  );
};

export default CircuitBasicInfo;