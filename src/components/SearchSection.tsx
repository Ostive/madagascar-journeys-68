import { Card } from "./ui/card";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const SearchSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl">
      <form className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Où souhaitez-vous aller ?"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de départ
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Voyageurs
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option>1 personne</option>
              <option>2 personnes</option>
              <option>3 personnes</option>
              <option>4+ personnes</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            &nbsp;
          </label>
          <button className="w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-600/90 transition-colors flex items-center justify-center gap-2">
            <Search size={20} />
            Rechercher
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchSection;