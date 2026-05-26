"use server";

import { createClient } from "@/lib/supabase/server";

export type DashboardStats = {
  totalBookings: number;
  activeFleet: number;
  pendingReviews: number;
  avgRating: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const [bookingsRes, carsRes, reviewsRes, ratingsRes] = await Promise.all([
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase
      .from("cars")
      .select("id", { count: "exact", head: true })
      .eq("status", "available"),
    supabase
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("approved", false),
    supabase.from("reviews").select("rating").eq("approved", true),
  ]);

  const ratings = ratingsRes.data ?? [];
  const avgRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

  return {
    totalBookings: bookingsRes.count ?? 0,
    activeFleet: carsRes.count ?? 0,
    pendingReviews: reviewsRes.count ?? 0,
    avgRating: Math.round(avgRating * 10) / 10,
  };
}
