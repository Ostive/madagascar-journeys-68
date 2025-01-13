import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { destinations } from "@/data/destinations";
import { circuits } from "@/data/circuits";

const SearchSection = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (value: string) => {
    setOpen(false);
    
    if (value.startsWith("destination-")) {
      const id = value.replace("destination-", "");
      navigate(`/destination/${id}`);
    } else if (value.startsWith("circuit-")) {
      const id = value.replace("circuit-", "");
      navigate(`/circuit/${id}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full justify-start text-left font-normal bg-white/90 backdrop-blur-sm"
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Rechercher une destination ou un circuit...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Destinations">
              {destinations.map((destination) => (
                <CommandItem
                  key={`destination-${destination.id}`}
                  value={`destination-${destination.id}`}
                  onSelect={handleSelect}
                >
                  {destination.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Circuits">
              {circuits.map((circuit) => (
                <CommandItem
                  key={`circuit-${circuit.id}`}
                  value={`circuit-${circuit.id}`}
                  onSelect={handleSelect}
                >
                  {circuit.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export default SearchSection;