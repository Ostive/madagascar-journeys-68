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

export const reservationSchema = z.object({
  adultsCount: z.number().min(1),
  childrenCount: z.number().min(0),
  startDate: z.string(),
  endDate: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;
export type ReservationSchema = z.infer<typeof reservationSchema>;