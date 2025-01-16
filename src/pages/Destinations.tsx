import { Card } from "@/components/ui/card";
import { destinations } from "@/data/data";
import Header from "@/components/Header";
import DestinationCard from "@/components/cards/DestinationCard";
import { motion } from "framer-motion";
import { SearchAndFilter, type FilterGroup } from "@/components/search/SearchAndFilter";
import { useState } from "react";
import { Palmtree, Mountain, Building, DollarSign, Clock, Sun } from "lucide-react";

const filterGroups: FilterGroup[] = [
  {
    id: "type",
    label: "Type",
    options: [
      { value: "all", label: "Tous les types" },
      { value: "nature", label: "Nature", icon: <Palmtree className="h-4 w-4" /> },
      { value: "culture", label: "Culture", icon: <Building className="h-4 w-4" /> },
      { value: "beach", label: "Plage", icon: <Mountain className="h-4 w-4" /> },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    options: [
      { value: "all", label: "Tous les budgets" },
      { value: "low", label: "Économique", icon: <DollarSign className="h-4 w-4" /> },
      { value: "medium", label: "Intermédiaire", icon: <DollarSign className="h-4 w-4" /> },
      { value: "high", label: "Premium", icon: <DollarSign className="h-4 w-4" /> },
    ],
  },
  {
    id: "duration",
    label: "Durée",
    options: [
      { value: "all", label: "Toutes les durées" },
      { value: "short", label: "Courts séjours", icon: <Clock className="h-4 w-4" /> },
      { value: "medium", label: "Séjours moyens", icon: <Clock className="h-4 w-4" /> },
      { value: "long", label: "Longs séjours", icon: <Clock className="h-4 w-4" /> },
    ],
  },
  {
    id: "season",
    label: "Saison",
    options: [
      { value: "all", label: "Toutes les saisons" },
      { value: "dry", label: "Saison sèche", icon: <Sun className="h-4 w-4" /> },
      { value: "wet", label: "Saison des pluies", icon: <Sun className="h-4 w-4" /> },
    ],
  },
];

const DestinationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic
  };

  const handleFilter = (filters: Record<string, string>) => {
    setActiveFilters(filters);
    // TODO: Implement filter logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <svg
              className="absolute right-0 top-0 h-[500px] w-[500px] transform translate-x-1/2 -translate-y-1/2 text-emerald-50"
              fill="currentColor"
              viewBox="0 0 200 200"
            >
              <defs>
                <pattern
                  id="destinationsPattern"
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
                fill="url(#destinationsPattern)"
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
                  Destinations
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Nos Destinations
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explorez nos destinations soigneusement sélectionnées à Madagascar.
                  Des plages paradisiaques aux forêts tropicales, découvrez la
                  diversité exceptionnelle de la Grande Île.
                </p>
              </motion.div>

              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <SearchAndFilter
                  placeholder="Rechercher une destination..."
                  filterGroups={filterGroups}
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  className="mb-12"
                />
              </motion.div>

              {/* Destinations Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {destinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                  >
                    <DestinationCard destination={destination} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default DestinationsPage;
