import { Filter, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const DestinationsNavBar = () => {
  return (
    <div className="sticky top-32 z-30 w-full bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald" />
            <h1 className="text-xl font-poppins font-semibold">Nos Destinations</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de circuit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les circuits</SelectItem>
                <SelectItem value="nature">Nature & Aventure</SelectItem>
                <SelectItem value="culture">Culture & Histoire</SelectItem>
                <SelectItem value="beach">Plages & Détente</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durée" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les durées</SelectItem>
                <SelectItem value="short">1-3 jours</SelectItem>
                <SelectItem value="medium">4-7 jours</SelectItem>
                <SelectItem value="long">8+ jours</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsNavBar;