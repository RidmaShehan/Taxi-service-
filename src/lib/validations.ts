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
  vehicle_type: z.string().optional(),
  car_id: z.string().uuid().optional().nullable(),
  driver_id: z.string().uuid().optional().nullable(),
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const carSchema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category required"),
  price_per_ride: z.coerce.number().min(0),
  seats: z.coerce.number().int().positive(),
  luggage: z.coerce.number().int().min(0),
  image_url: z.string().optional(),
  status: z.enum(["available", "in_service", "maintenance"]).default("available"),
  featured: z.coerce.boolean().optional(),
});

export type CarFormValues = z.infer<typeof carSchema>;

export const driverSchema = z.object({
  name: z.string().min(2),
  driver_code: z.string().min(2),
  phone: z.string().min(6),
  status: z.enum(["available", "pending", "confirmed", "off_duty"]).default("available"),
  rating: z.coerce.number().min(0).max(5).default(5),
  car_id: z.string().uuid().optional().nullable(),
});

export type DriverFormValues = z.infer<typeof driverSchema>;

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
  country: z.string().optional(),
  route: z.string().optional(),
  approved: z.boolean().optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export const galleryImageSchema = z.object({
  image_url: z.string().min(1),
  caption: z.string().optional(),
  car_id: z.string().uuid().optional().nullable(),
  is_visible: z.boolean().optional(),
  sort_order: z.coerce.number().int().optional(),
});

export type GalleryImageFormValues = z.infer<typeof galleryImageSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const optionalString = z.preprocess(
  (v) => (v === null || v === undefined ? undefined : String(v)),
  z.string().optional()
);

const optionalUrl = z.preprocess(
  (v) => {
    if (v === null || v === undefined || v === "") return undefined;
    return String(v);
  },
  z.union([z.string().url(), z.literal("")]).optional()
);

export const siteSettingsSchema = z.object({
  site_name: z.string().min(1),
  site_description: z.string().min(1),
  meta_title: z.string().min(1),
  meta_keywords: optionalString,
  meta_robots: optionalString,
  canonical_url: optionalUrl,
  og_title: optionalString,
  og_description: optionalString,
  og_image_url: optionalString,
  logo_url: optionalString,
  favicon_url: optionalString,
  phone: z.string().min(6),
  email: z.string().email(),
  whatsapp_phone: z.string().min(6),
  address_street: optionalString,
  address_locality: optionalString,
  address_region: optionalString,
  postal_code: optionalString,
  address_country: optionalString,
  address_display: optionalString,
  contact_page_title: optionalString,
  contact_page_subtitle: optionalString,
  contact_hub_title: optionalString,
  map_embed_url: optionalString,
  map_link_url: optionalUrl,
  hours_airport: optionalString,
  hours_office: optionalString,
  hours_response: optionalString,
  hero_badge: optionalString,
  hero_title: optionalString,
  hero_subtitle: optionalString,
  hero_image_url: optionalString,
  hero_travelers_label: optionalString,
  stat_1_value: optionalString,
  stat_1_label: optionalString,
  stat_2_value: optionalString,
  stat_2_label: optionalString,
  stat_3_value: optionalString,
  stat_3_label: optionalString,
  stat_4_value: optionalString,
  stat_4_label: optionalString,
  footer_description: optionalString,
  cta_title: optionalString,
  cta_subtitle: optionalString,
  facebook_url: optionalUrl,
  twitter_url: optionalUrl,
  instagram_url: optionalUrl,
  maintenance_mode: z.boolean().optional(),
  maintenance_message: optionalString,
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;
