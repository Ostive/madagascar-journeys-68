import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { reservationSchema } from "./reservationSchema";
import { useState } from "react";
import { Destination } from "@/data/types";

export interface ReservationFormProps {
  destinationId: string;
  destination: Destination;
}

export function ReservationForm({ destinationId, destination }: ReservationFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      adultsCount: 1,
      childrenCount: 0,
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Handle reservation logic here
      console.log("Reservation data:", data);
    } catch (error) {
      console.error("Error making reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="adultsCount" className="block text-sm font-medium">
            Adults
          </label>
          <input
            type="number"
            id="adultsCount"
            {...form.register("adultsCount")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-emerald-500"
            min="1"
          />
        </div>
        <div>
          <label htmlFor="childrenCount" className="block text-sm font-medium">
            Children
          </label>
          <input
            type="number"
            id="childrenCount"
            {...form.register("childrenCount")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-emerald-500"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            {...form.register("startDate")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            {...form.register("endDate")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-emerald-500"
          />
        </div>
        <Button type="submit" variant="default" disabled={loading}>
          {loading ? "Loading..." : "Reserve"}
        </Button>
      </form>
    </Form>
  );
}