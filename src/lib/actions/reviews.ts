"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { reviewSchema } from "@/lib/validations";
import type { ReviewRow } from "@/types/database.types";

function revalidate() {
  ["/reviews", "/admin", "/admin/reviews"].forEach((p) => revalidatePath(p));
}

export async function getReviews(options?: {
  approvedOnly?: boolean;
  pendingOnly?: boolean;
}): Promise<ReviewRow[]> {
  const supabase = await createClient();
  let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });

  if (options?.approvedOnly) query = query.eq("approved", true);
  if (options?.pendingOnly) query = query.eq("approved", false);

  const { data, error } = await query;
  if (error) {
    console.error("getReviews error:", error.message);
    return [];
  }
  return (data ?? []) as ReviewRow[];
}

export async function createReview(formData: FormData) {
  const parsed = reviewSchema.safeParse({
    name: formData.get("name"),
    review: formData.get("review"),
    rating: formData.get("rating"),
    country: formData.get("country") || undefined,
    route: formData.get("route") || undefined,
    approved: false,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reviews").insert({
    ...parsed.data,
    country: parsed.data.country || null,
    route: parsed.data.route || null,
    approved: false,
  });

  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}

export async function approveReview(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").update({ approved: true }).eq("id", id);
  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}

export async function declineReview(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}
