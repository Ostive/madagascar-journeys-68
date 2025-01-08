import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

interface PackageOptionsProps {
  included: string[];
  notIncluded: string[];
  onIncludedChange: (included: string[]) => void;
  onNotIncludedChange: (notIncluded: string[]) => void;
}

interface Option {
  id: number;
  name: string;
  description: string | null;
}

export const PackageOptionsSection = ({
  included,
  notIncluded,
  onIncludedChange,
  onNotIncludedChange,
}: PackageOptionsProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const { data, error } = await supabase
        .from('options')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error('Error fetching options:', error);
        return;
      }
      
      setOptions(data || []);
    };

    fetchOptions();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <label className="text-sm font-medium">Inclus</label>
        {options.length === 0 ? (
          <p className="text-sm text-muted-foreground">Pas encore d'options à sélectionner.</p>
        ) : (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`included-${option.id}`}
                  checked={included.includes(option.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onIncludedChange([...included, option.name]);
                    } else {
                      onIncludedChange(
                        included.filter((i) => i !== option.name)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`included-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Non inclus</label>
        {options.length === 0 ? (
          <p className="text-sm text-muted-foreground">Pas encore d'options à sélectionner.</p>
        ) : (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`not-included-${option.id}`}
                  checked={notIncluded.includes(option.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onNotIncludedChange([...notIncluded, option.name]);
                    } else {
                      onNotIncludedChange(
                        notIncluded.filter((i) => i !== option.name)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`not-included-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};