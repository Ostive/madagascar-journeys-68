import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "../reservationSchema";

interface DateSelectionStepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const DateSelectionStep = ({ form }: DateSelectionStepProps) => {
  const hasDates = form.watch("has_dates");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="has_dates"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Connaissez-vous les dates précises de votre voyage ?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value ? "true" : "false"}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="yes" />
                  <label htmlFor="yes">Oui</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="no" />
                  <label htmlFor="no">Non</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {hasDates ? (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de départ</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de retour</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="estimated_month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mois estimé</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un mois" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "Janvier",
                      "Février",
                      "Mars",
                      "Avril",
                      "Mai",
                      "Juin",
                      "Juillet",
                      "Août",
                      "Septembre",
                      "Octobre",
                      "Novembre",
                      "Décembre",
                    ].map((month) => (
                      <SelectItem key={month} value={month.toLowerCase()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimated_season"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Saison préférée</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une saison" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="spring">Printemps</SelectItem>
                    <SelectItem value="summer">Été</SelectItem>
                    <SelectItem value="autumn">Automne</SelectItem>
                    <SelectItem value="winter">Hiver</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default DateSelectionStep;