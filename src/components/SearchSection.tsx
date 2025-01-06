import { Card } from "./ui/card";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "./ui/button";

const SearchSection = () => {
  return (
    <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-xl">
      <form className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Où souhaitez-vous aller ?"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald focus:border-emerald"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Date de départ
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald focus:border-emerald"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Voyageurs
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald focus:border-emerald appearance-none">
              <option>1 personne</option>
              <option>2 personnes</option>
              <option>3 personnes</option>
              <option>4+ personnes</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 invisible">
            Rechercher
          </label>
          <Button 
            type="submit"
            className="w-full bg-emerald hover:bg-emerald/90 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={20} />
            Rechercher
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SearchSection;