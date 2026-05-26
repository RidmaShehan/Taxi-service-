"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { bookingSchema } from "@/lib/validations";
import type { BookingRow } from "@/types/database.types";

function revalidateBookings() {
  ["/admin", "/admin/bookings", "/booking"].forEach((p) => revalidatePath(p));
}

export async function getBookings(limit?: number): Promise<BookingRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getBookings error:", error.message);
    return [];
  }
  return (data ?? []) as BookingRow[];
}

export async function createBooking(formData: FormData) {
  const parsed = bookingSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    pickup_location: formData.get("pickup_location"),
    destination: formData.get("destination"),
    date_time: formData.get("date_time"),
    passenger_count: formData.get("passenger_count"),
    message: formData.get("message") || undefined,
    vehicle_type: formData.get("vehicle_type") || undefined,
    car_id: formData.get("car_id") || undefined,
    driver_id: formData.get("driver_id") || undefined,
    status: formData.get("status") || "pending",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid booking data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("bookings").insert({
    ...parsed.data,
    message: parsed.data.message || null,
    vehicle_type: parsed.data.vehicle_type || null,
    car_id: parsed.data.car_id || null,
    driver_id: parsed.data.driver_id || null,
    status: parsed.data.status ?? "pending",
  });

  if (error) return { error: error.message };

  revalidateBookings();
  return { success: true };
}

export async function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled"
) {
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidateBookings();
  return { success: true };
}

export async function deleteBooking(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateBookings();
  return { success: true };
}
