import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type FilterOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
};

type SearchAndFilterProps = {
  placeholder?: string;
  filterGroups: FilterGroup[];
  onSearch?: (value: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
  className?: string;
};

export const SearchAndFilter = ({
  placeholder = "Rechercher...",
  filterGroups,
  onSearch,
  onFilter,
  className,
}: SearchAndFilterProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleFilter = (groupId: string, value: string) => {
    const newFilters = {
      ...selectedFilters,
      [groupId]: value,
    };
    setSelectedFilters(newFilters);
    onFilter?.(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilter?.({});
  };

  const activeFiltersCount = Object.values(selectedFilters).filter(Boolean).length;

  return (
    <Card className={cn("bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg rounded-3xl", className)}>
      <div className="p-6 md:p-8">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
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
            {filterGroups.map((group) => (
              <Select
                key={group.id}
                value={selectedFilters[group.id]}
                onValueChange={(value) => handleFilter(group.id, value)}
              >
                <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 hover:border-emerald-500/50 transition-colors">
                  <SelectValue placeholder={group.label} />
                </SelectTrigger>
                <SelectContent>
                  {group.options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="flex items-center gap-2"
                    >
                      {option.icon}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12 rounded-xl bg-white border-gray-200 focus:border-emerald-500/50"
            />
          </div>
          <div className="flex gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl border-gray-200 hover:border-emerald-500/50"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-6">
                  {filterGroups.map((group) => (
                    <div key={group.id}>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        {group.label}
                      </label>
                      <Select
                        value={selectedFilters[group.id]}
                        onValueChange={(value) => handleFilter(group.id, value)}
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200">
                          <SelectValue placeholder={`Sélectionner ${group.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {group.options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="flex items-center gap-2"
                            >
                              {option.icon}
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                {activeFiltersCount > 0 && (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full h-12 rounded-xl"
                    >
                      Effacer les filtres ({activeFiltersCount})
                      <X className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </Card>
  );
};
