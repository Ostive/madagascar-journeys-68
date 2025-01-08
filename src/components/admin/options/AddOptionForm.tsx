import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddOptionFormProps {
  onAdd: (name: string, description: string) => void;
}

export const AddOptionForm = ({ onAdd }: AddOptionFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name) return;
    onAdd(name, description);
    setName("");
    setDescription("");
  };

  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1 space-y-2">
        <Label>Nom</Label>
        <Input
          placeholder="Nouvelle option"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex-1 space-y-2">
        <Label>Description</Label>
        <Input
          placeholder="Description de l'option"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>
        <Plus className="w-4 h-4 mr-2" />
        Ajouter
      </Button>
    </div>
  );
};