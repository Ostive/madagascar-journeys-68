import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CircuitPricingProps {
  formData: {
    price: number;
    date_range: string;
    difficulty: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
}

const CircuitPricing = ({ formData, handleChange, handleSelectChange }: CircuitPricingProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Prix</Label>
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Entrez le prix"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Période</Label>
        <Input
          name="date_range"
          value={formData.date_range}
          onChange={handleChange}
          placeholder="Ex: JUIN - AOÛT"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Difficulté</Label>
        <Select
          value={formData.difficulty}
          onValueChange={(value) => handleSelectChange(value, 'difficulty')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez la difficulté" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Facile">Facile</SelectItem>
            <SelectItem value="Modéré">Modéré</SelectItem>
            <SelectItem value="Difficile">Difficile</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CircuitPricing;