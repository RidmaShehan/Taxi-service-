import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Phone required"),
  pickup_location: z.string().min(2, "Pickup location required"),
  destination: z.string().min(2, "Destination required"),
  date_time: z.string().min(1, "Date and time required"),
  passenger_count: z.coerce.number().int().positive("At least 1 passenger"),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const carSchema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().optional(),
  seats: z.coerce.number().int().positive(),
  luggage: z.coerce.number().int().min(0),
});

export type CarFormValues = z.infer<typeof carSchema>;

export const testimonialSchema = z.object({
  name: z.string().min(2),
  country: z.string().optional(),
  review: z.string().min(10),
  rating: z.coerce.number().int().min(1).max(5),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export const reviewSchema = z.object({
  name: z.string().min(2),
  review: z.string().min(10),
  rating: z.coerce.number().int().min(1).max(5),
  approved: z.boolean().optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
