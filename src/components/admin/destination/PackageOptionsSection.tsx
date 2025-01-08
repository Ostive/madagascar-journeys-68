import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/database.types";

interface PackageOptionsProps {
  included: string[];
  notIncluded: string[];
  onIncludedChange: (included: string[]) => void;
  onNotIncludedChange: (notIncluded: string[]) => void;
}

type PackageOption = Tables['package_options']['Row'];

export const PackageOptionsSection = ({
  included,
  notIncluded,
  onIncludedChange,
  onNotIncludedChange,
}: PackageOptionsProps) => {
  const [options, setOptions] = useState<PackageOption[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const { data, error } = await supabase
        .from('package_options')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error('Error fetching package options:', error);
        return;
      }
      
      setOptions(data || []);
    };

    fetchOptions();
  }, []);

  const includedOptions = options.filter(option => option.included);
  const notIncludedOptions = options.filter(option => option.not_included);

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <label className="text-sm font-medium">Inclus</label>
        {includedOptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Pas encore d'options incluses à sélectionner.</p>
        ) : (
          <div className="space-y-2">
            {includedOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`included-${option.id}`}
                  checked={included.includes(option.additional_activities)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onIncludedChange([...included, option.additional_activities]);
                    } else {
                      onIncludedChange(
                        included.filter((i) => i !== option.additional_activities)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`included-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.additional_activities}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Non inclus</label>
        {notIncludedOptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Pas encore d'options non incluses à sélectionner.</p>
        ) : (
          <div className="space-y-2">
            {notIncludedOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`not-included-${option.id}`}
                  checked={notIncluded.includes(option.additional_activities)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onNotIncludedChange([...notIncluded, option.additional_activities]);
                    } else {
                      onNotIncludedChange(
                        notIncluded.filter((i) => i !== option.additional_activities)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`not-included-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.additional_activities}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};