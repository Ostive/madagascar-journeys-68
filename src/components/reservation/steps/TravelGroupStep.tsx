import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, User, UserPlus, Building } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "../reservationSchema";

interface TravelGroupStepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const TravelGroupStep = ({ form }: TravelGroupStepProps) => {
  const travelType = form.watch("travel_type");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="travel_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Avec qui partez-vous ?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <label htmlFor="solo" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Seul(e)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="couple" id="couple" />
                  <label htmlFor="couple" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    En couple
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family" id="family" />
                  <label htmlFor="family" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    En famille
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" />
                  <label htmlFor="friends" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Entre amis
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <label htmlFor="group" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    En groupe
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {(travelType === "family" || travelType === "group") && (
        <div className="space-y-4">
          {travelType === "family" && (
            <>
              <FormField
                control={form.control}
                name="adults_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre d'adultes</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="children_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre d'enfants</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {travelType === "group" && (
            <>
              <FormField
                control={form.control}
                name="group_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de groupe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type de groupe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="friends">Groupe d'amis</SelectItem>
                        <SelectItem value="school">Groupe scolaire</SelectItem>
                        <SelectItem value="business">Groupe professionnel</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="group_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taille du groupe</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelGroupStep;