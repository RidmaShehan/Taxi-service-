import { z } from "zod";
import { zFormEmail, zFormOptionalString, zFormUrl } from "@/lib/zod-form";

const zFormRequired = (min: number, message?: string) =>
  z.preprocess(
    (v) => (v === null || v === undefined ? "" : String(v)),
    z.string().min(min, message)
  );

const zFormUuidNullable = z.preprocess(
  (v) => (v === null || v === undefined || v === "" ? null : String(v)),
  z.union([z.string().uuid(), z.null()]).optional()
);

const carStatusSchema = z.preprocess(
  (v) => (v === null || v === undefined || v === "" ? "available" : String(v)),
  z.enum(["available", "in_service", "maintenance"])
);

const driverStatusSchema = z.preprocess(
  (v) => (v === null || v === undefined || v === "" ? "available" : String(v)),
  z.enum(["available", "pending", "confirmed", "off_duty"])
);

const bookingStatusSchema = z.preprocess(
  (v) => (v === null || v === undefined || v === "" ? "pending" : String(v)),
  z.enum(["pending", "confirmed", "cancelled"])
);

export const bookingSchema = z.object({
  name: zFormRequired(2, "Name must be at least 2 characters"),
  email: zFormEmail,
  phone: zFormRequired(6, "Phone required"),
  pickup_location: zFormRequired(2, "Pickup location required"),
  destination: zFormRequired(2, "Destination required"),
  date_time: zFormRequired(1, "Date and time required"),
  passenger_count: z.coerce.number().int().positive("At least 1 passenger"),
  message: zFormOptionalString,
  vehicle_type: zFormOptionalString,
  car_id: zFormUuidNullable,
  driver_id: zFormUuidNullable,
  status: bookingStatusSchema.optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const carSchema = z.object({
  name: zFormRequired(1, "Name required"),
  description: zFormOptionalString,
  category: zFormRequired(1, "Category required"),
  price_per_ride: z.coerce.number().min(0),
  seats: z.coerce.number().int().positive(),
  luggage: z.coerce.number().int().min(0),
  image_url: zFormOptionalString,
  status: carStatusSchema,
  featured: z.preprocess((v) => v === true || v === "true", z.boolean().optional()),
});

export type CarFormValues = z.infer<typeof carSchema>;

export const driverSchema = z.object({
  name: zFormRequired(2),
  driver_code: zFormRequired(2),
  phone: zFormRequired(6),
  status: driverStatusSchema,
  rating: z.coerce.number().min(0).max(5),
  car_id: zFormUuidNullable,
});

export type DriverFormValues = z.infer<typeof driverSchema>;

export const testimonialSchema = z.object({
  name: zFormRequired(2),
  country: zFormOptionalString,
  review: zFormRequired(10),
  rating: z.coerce.number().int().min(1).max(5),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export const reviewSchema = z.object({
  name: zFormRequired(2),
  review: zFormRequired(10),
  rating: z.coerce.number().int().min(1).max(5),
  country: zFormOptionalString,
  route: zFormOptionalString,
  approved: z.preprocess((v) => v === true || v === "true", z.boolean().optional()),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export const galleryImageSchema = z.object({
  image_url: zFormRequired(1, "Image required"),
  caption: zFormOptionalString,
  car_id: zFormUuidNullable,
  is_visible: z.preprocess((v) => v === true || v === "true", z.boolean().optional()),
  sort_order: z.coerce.number().int().optional(),
});

export type GalleryImageFormValues = z.infer<typeof galleryImageSchema>;

export const loginSchema = z.object({
  email: zFormEmail,
  password: z.preprocess(
    (v) => (v === null || v === undefined ? "" : String(v)),
    z.string().min(6)
  ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const siteSettingsSchema = z.object({
  site_name: zFormRequired(1),
  site_description: zFormRequired(1),
  meta_title: zFormRequired(1),
  meta_keywords: zFormOptionalString,
  meta_robots: zFormOptionalString,
  canonical_url: zFormUrl,
  og_title: zFormOptionalString,
  og_description: zFormOptionalString,
  og_image_url: zFormOptionalString,
  logo_url: zFormOptionalString,
  favicon_url: zFormOptionalString,
  phone: zFormRequired(6),
  email: zFormEmail,
  whatsapp_phone: zFormRequired(6),
  address_street: zFormOptionalString,
  address_locality: zFormOptionalString,
  address_region: zFormOptionalString,
  postal_code: zFormOptionalString,
  address_country: zFormOptionalString,
  address_display: zFormOptionalString,
  contact_page_title: zFormOptionalString,
  contact_page_subtitle: zFormOptionalString,
  contact_hub_title: zFormOptionalString,
  map_embed_url: zFormOptionalString,
  map_link_url: zFormUrl,
  hours_airport: zFormOptionalString,
  hours_office: zFormOptionalString,
  hours_response: zFormOptionalString,
  hero_badge: zFormOptionalString,
  hero_title: zFormOptionalString,
  hero_subtitle: zFormOptionalString,
  hero_image_url: zFormOptionalString,
  hero_travelers_label: zFormOptionalString,
  stat_1_value: zFormOptionalString,
  stat_1_label: zFormOptionalString,
  stat_2_value: zFormOptionalString,
  stat_2_label: zFormOptionalString,
  stat_3_value: zFormOptionalString,
  stat_3_label: zFormOptionalString,
  stat_4_value: zFormOptionalString,
  stat_4_label: zFormOptionalString,
  footer_description: zFormOptionalString,
  cta_title: zFormOptionalString,
  cta_subtitle: zFormOptionalString,
  facebook_url: zFormUrl,
  twitter_url: zFormUrl,
  instagram_url: zFormUrl,
  maintenance_mode: z.preprocess(
    (v) => v === true || v === "true",
    z.boolean()
  ),
  maintenance_message: zFormOptionalString,
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;

/** Human-readable first validation error for server actions. */
export function formatZodError(error: z.ZodError): string {
  const first = error.issues[0];
  const field = first?.path.join(".") ?? "field";
  return first?.message ? `${field}: ${first.message}` : "Invalid data";
}
