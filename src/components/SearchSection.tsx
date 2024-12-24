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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="bg-white rounded-lg shadow-xl p-6">
          <form className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Où souhaitez-vous aller ?"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de départ
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="date"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Voyageurs
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Nombre de voyageurs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 personne</SelectItem>
                    <SelectItem value="2">2 personnes</SelectItem>
                    <SelectItem value="3">3 personnes</SelectItem>
                    <SelectItem value="4">4+ personnes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                &nbsp;
              </label>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="default">
                <Search size={20} />
                Rechercher
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default SearchSection;