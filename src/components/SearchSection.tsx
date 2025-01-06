import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "./ui/button";
import { destinations } from "@/data/data";
import { circuits } from "@/data/data";
import { toast } from "./ui/use-toast";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("1");

  const handleSearch = () => {
    if (!selectedDestination) {
      toast({
        title: "Destination requise",
        description: "Veuillez sélectionner une destination",
        variant: "destructive",
      });
      return;
    }

    const destination = destinations.find((d) => d.id === selectedDestination);
    const circuit = circuits.find((c) => c.id === selectedDestination);

    if (destination) {
      navigate(`/destination/${selectedDestination}`);
    } else if (circuit) {
      navigate(`/circuit/${selectedDestination}`);
    }
  };

  return (
    <Card className="relative bg-white/30 rounded-xl shadow-xl p-6 max-w-4xl border-none">
      <div className="absolute inset-0 backdrop-blur-md rounded-xl" />
      <div className="relative">
        <form
          className="grid grid-cols-1 lg:grid-cols-4 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
              <input
                type="text"
                placeholder="Où souhaitez-vous aller ?"
                className="block w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50"
                style={{
                  WebkitAppearance: 'none',
                  appearance: 'none'
                }}
                onClick={() => setSearchOpen(true)}
                value={selectedDestination ? destinations.find((d) => d.id === selectedDestination)?.title || circuits.find((c) => c.id === selectedDestination)?.title : ""}
                readOnly
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Date de départ
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" size={20} />
              <input
                type="date"
                className="block w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50"
                style={{
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  colorScheme: 'light'
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Voyageurs
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
              <select
                className="block w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50"
                style={{
                  WebkitAppearance: 'none',
                  appearance: 'none'
                }}
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
              >
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
                <option value="3">3 personnes</option>
                <option value="4">4+ personnes</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              &nbsp;
            </label>
            <Button
              type="submit"
              className="w-full h-12 bg-green-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            >
              <Search size={20} />
              Rechercher
            </Button>
          </div>
        </form>

        <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
          <CommandInput placeholder="Rechercher une destination ou un circuit..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Destinations">
              {destinations.map((destination) => (
                <CommandItem
                  key={destination.id}
                  onSelect={() => {
                    setSelectedDestination(destination.id);
                    setSearchOpen(false);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {destination.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Circuits">
              {circuits.map((circuit) => (
                <CommandItem
                  key={circuit.id}
                  onSelect={() => {
                    setSelectedDestination(circuit.id);
                    setSearchOpen(false);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {circuit.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </Card>
  );
};

export default SearchSection;