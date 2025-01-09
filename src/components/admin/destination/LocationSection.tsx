import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locations = [
  { value: "antananarivo", label: "Antananarivo" },
  { value: "nosy-be", label: "Nosy Be" },
  { value: "toamasina", label: "Toamasina" },
  { value: "mahajanga", label: "Mahajanga" },
  { value: "antsiranana", label: "Antsiranana" },
  { value: "fianarantsoa", label: "Fianarantsoa" },
  { value: "toliara", label: "Toliara" },
  { value: "antsirabe", label: "Antsirabe" },
  { value: "morondava", label: "Morondava" },
  { value: "fort-dauphin", label: "Fort-Dauphin" },
];

const directions = [
  { value: "nord", label: "Nord" },
  { value: "sud", label: "Sud" },
  { value: "est", label: "Est" },
  { value: "ouest", label: "Ouest" },
  { value: "nord-est", label: "Nord-Est" },
  { value: "nord-ouest", label: "Nord-Ouest" },
  { value: "sud-est", label: "Sud-Est" },
  { value: "sud-ouest", label: "Sud-Ouest" },
];

interface LocationSectionProps {
  location: string;
  direction: string;
  onLocationChange: (value: string) => void;
  onDirectionChange: (value: string) => void;
}

export function LocationSection({
  location,
  direction,
  onLocationChange,
  onDirectionChange,
}: LocationSectionProps) {
  const [open, setOpen] = useState(false);
  const selectedLocation = locations.find((loc) => loc.value === location);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Localisation</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedLocation?.label || "Sélectionnez un lieu..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Rechercher un lieu..." />
              <CommandEmpty>Aucun lieu trouvé.</CommandEmpty>
              <CommandGroup>
                {locations.map((loc) => (
                  <CommandItem
                    key={loc.value}
                    value={loc.value}
                    onSelect={() => {
                      onLocationChange(loc.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        location === loc.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {loc.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Direction</label>
        <Select value={direction} onValueChange={onDirectionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez une direction" />
          </SelectTrigger>
          <SelectContent>
            {directions.map((dir) => (
              <SelectItem key={dir.value} value={dir.value}>
                {dir.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}