import * as z from "zod";

export const formSchema = z.object({
  travel_type: z.enum(["solo", "couple", "family", "friends", "group"]),
  adults_count: z.number().min(1).optional(),
  children_count: z.number().min(0).optional(),
  group_type: z.enum(["friends", "school", "business", "other"]).optional(),
  group_size: z.number().min(1).optional(),
  has_dates: z.boolean(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  estimated_month: z.string().optional(),
  estimated_season: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

// This type ensures form data matches what Supabase expects
export type ReservationRequest = {
  user_id: string;
  destination_id: string;
  travel_type: string;
  adults_count?: number;
  children_count?: number;
  group_type?: string;
  group_size?: number;
  start_date?: string;
  end_date?: string;
  estimated_month?: string;
  estimated_season?: string;
};