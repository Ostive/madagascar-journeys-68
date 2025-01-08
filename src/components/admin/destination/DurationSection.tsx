import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

interface DurationSectionProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

export const DurationSection = ({ value, onChange }: DurationSectionProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Durée</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "d MMMM", { locale: fr })} -{" "}
                  {format(value.to, "d MMMM", { locale: fr })}
                </>
              ) : (
                format(value.from, "d MMMM", { locale: fr })
              )
            ) : (
              <span>Sélectionnez une période</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};