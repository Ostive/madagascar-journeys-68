import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CircuitCard from "@/components/cards/CircuitCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { Clock, DollarSign, Users, MapPin, Utensils, Palmtree, Building, Camera, Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Experiences badges
const experiences = [
  { id: "culinary", label: "Culinaire", icon: <Utensils className="h-4 w-4" /> },
  { id: "beach", label: "Plage", icon: <Palmtree className="h-4 w-4" /> },
  { id: "culture", label: "Culture", icon: <Building className="h-4 w-4" /> },
  { id: "photo", label: "Photographie", icon: <Camera className="h-4 w-4" /> },
];

const locations = [
  { value: "north", label: "Nord", icon: <MapPin className="h-4 w-4" /> },
  { value: "south", label: "Sud", icon: <MapPin className="h-4 w-4" /> },
  { value: "east", label: "Est", icon: <MapPin className="h-4 w-4" /> },
  { value: "west", label: "Ouest", icon: <MapPin className="h-4 w-4" /> },
  { value: "central", label: "Centre", icon: <MapPin className="h-4 w-4" /> },
];

const durations = [
  { value: "3", label: "3 jours" },
  { value: "4", label: "4 jours" },
  { value: "5", label: "5 jours" },
  { value: "6", label: "6 jours" },
  { value: "7", label: "7 jours" },
  { value: "more", label: "Plus de 7 jours" },
];

const groupTypes = [
  { value: "couple", label: "Couple", icon: <Heart className="h-4 w-4" /> },
  { value: "family", label: "Famille", icon: <Users className="h-4 w-4" /> },
  { value: "group", label: "Groupe", icon: <Users className="h-4 w-4" /> },
  { value: "association", label: "Association", icon: <Users className="h-4 w-4" /> },
];

const CircuitsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedGroupType, setSelectedGroupType] = useState<string>("");
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const { data: circuits, isLoading } = useQuery({
    queryKey: ['circuits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .eq('enabled', true)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Impossible de charger les circuits",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const handleExperienceToggle = (experienceId: string) => {
    setSelectedExperiences(prev => {
      if (prev.includes(experienceId)) {
        return prev.filter(id => id !== experienceId);
      } else {
        return [...prev, experienceId];
      }
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (maxPrice && parseInt(value) > parseInt(maxPrice)) {
      return;
    }
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (minPrice && parseInt(value) < parseInt(minPrice)) {
      return;
    }
    setMaxPrice(value);
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (parseInt(value) <= 20 || value === '') {
      setNumberOfPeople(value);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSelectedExperiences([]);
    setMinPrice("");
    setMaxPrice("");
    setNumberOfPeople("");
    setSelectedDuration("");
    setSelectedLocation("");
    setSelectedGroupType("");
  };

  const activeFiltersCount = [
    selectedExperiences.length > 0,
    minPrice,
    maxPrice,
    numberOfPeople,
    selectedDuration,
    selectedLocation,
    selectedGroupType,
  ].filter(Boolean).length;

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/public/placeholder.svg')] bg-[length:100px_100px] opacity-5"></div>
            {/* Background Pattern */}
            <div className="absolute inset-0">
            <svg
              className="absolute right-0 top-0 h-[500px] w-[500px] transform translate-x-1/2 -translate-y-1/2 text-emerald-50"
              fill="currentColor"
              viewBox="0 0 200 200"
            >
              <defs>
                <pattern
                  id="circuitsPattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" className="text-emerald-500" />
                </pattern>
              </defs>
              <path
                fill="url(#circuitsPattern)"
                d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zM100 150c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z"
              />
            </svg>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
                  Circuits
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Nos Circuits
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Découvrez nos circuits guidés à travers Madagascar. Des itinéraires
                  soigneusement conçus pour vous faire découvrir les merveilles de
                  l'île.
                </p>
              </motion.div>

              {/* Updated Filters with matching theme */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg rounded-3xl">
                  <div className="p-6 md:p-8">
                    {/* Desktop View */}
                    <div className="hidden md:block">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="Rechercher un circuit..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="pl-10 h-12 rounded-xl bg-white border-gray-200 focus:border-emerald-500/50"
                          />
                        </div>
                        {activeFiltersCount > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                            className="h-12 px-4 rounded-xl border-gray-200 hover:border-emerald-500/50"
                          >
                            Effacer les filtres ({activeFiltersCount})
                            <X className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Duration Select */}
                        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                          <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 hover:border-emerald-500/50 transition-colors">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <SelectValue placeholder="Durée" />
                          </SelectTrigger>
                          <SelectContent>
                            {durations.map((duration) => (
                              <SelectItem key={duration.value} value={duration.value}>
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Location Select */}
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 hover:border-emerald-500/50 transition-colors">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <SelectValue placeholder="Région" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.value} value={location.value}>
                                <div className="flex items-center gap-2">
                                  {location.icon}
                                  <span>{location.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Budget Range */}
                        <div className="flex items-center space-x-2">
                          <div className="relative flex-1">
                            <Input
                              type="text"
                              value={minPrice}
                              onChange={handleMinPriceChange}
                              placeholder="Min €"
                              className="pl-6 h-12 rounded-xl bg-white border-gray-200 focus:border-emerald-500/50"
                            />
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                              €
                            </span>
                          </div>
                          <span className="text-gray-400">—</span>
                          <div className="relative flex-1">
                            <Input
                              type="text"
                              value={maxPrice}
                              onChange={handleMaxPriceChange}
                              placeholder="Max €"
                              className="pl-6 h-12 rounded-xl bg-white border-gray-200 focus:border-emerald-500/50"
                            />
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                              €
                            </span>
                          </div>
                        </div>

                        {/* More Filters Button */}
                        <Dialog open={isMoreFiltersOpen} onOpenChange={setIsMoreFiltersOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl border-gray-200 hover:border-emerald-500/50"
                            >
                              <SlidersHorizontal className="h-4 w-4 mr-2" />
                              Plus de filtres
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px] p-6">
                            <DialogHeader className="pb-4">
                              <DialogTitle className="text-xl font-semibold">Filtres avancés</DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              {/* Group Type */}
                              <div className="space-y-2">
                                <h3 className="font-medium text-sm text-gray-700">Type de groupe</h3>
                                <Select value={selectedGroupType} onValueChange={setSelectedGroupType}>
                                  <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 hover:border-emerald-500/50">
                                    <SelectValue placeholder="Sélectionnez un type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {groupTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        <div className="flex items-center gap-2">
                                          {type.icon}
                                          <span>{type.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Number of People */}
                              <div className="space-y-2">
                                <h3 className="font-medium text-sm text-gray-700">Nombre de personnes</h3>
                                <Input
                                  type="text"
                                  value={numberOfPeople}
                                  onChange={handlePeopleChange}
                                  placeholder="Nombre de personnes"
                                  className="h-12 rounded-xl bg-white border-gray-200 focus:border-emerald-500/50"
                                />
                              </div>

                              {/* Experiences */}
                              <div className="space-y-2">
                                <h3 className="font-medium text-sm text-gray-700">Expériences</h3>
                                <div className="flex flex-wrap gap-2">
                                  {experiences.map((experience) => (
                                    <Badge
                                      key={experience.id}
                                      variant="outline"
                                      className={cn(
                                        "cursor-pointer hover:bg-emerald-50 transition-colors",
                                        "py-1.5 px-3 rounded-lg border-gray-200",
                                        selectedExperiences.includes(experience.id) && 
                                        "bg-emerald-50 border-emerald-200 text-emerald-700"
                                      )}
                                      onClick={() => handleExperienceToggle(experience.id)}
                                    >
                                      <div className="flex items-center gap-2">
                                        {experience.icon}
                                        <span>{experience.label}</span>
                                      </div>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                              <Button
                                variant="outline"
                                onClick={() => setIsMoreFiltersOpen(false)}
                                className="rounded-xl"
                              >
                                Annuler
                              </Button>
                              <Button
                                onClick={() => setIsMoreFiltersOpen(false)}
                                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                              >
                                Appliquer
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {/* Mobile View */}
                    {/* ... similar mobile view updates with matching theme ... */}
                  </div>
                </Card>
              </motion.div>

              {/* Circuits Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
              >
                {isLoading ? (
                  <div className="col-span-full flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
                  </div>
                ) : circuits?.map((circuit, index) => (
                  <motion.div
                    key={circuit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                  >
                    <CircuitCard circuit={circuit} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CircuitsPage;
