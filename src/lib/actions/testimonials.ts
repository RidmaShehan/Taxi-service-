"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { testimonialSchema } from "@/lib/validations";
import type { TestimonialRow } from "@/types/database.types";

function revalidate() {
  ["/", "/admin", "/admin/reviews"].forEach((p) => revalidatePath(p));
}

export async function getTestimonials(limit?: number): Promise<TestimonialRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getTestimonials error:", error.message);
    return [];
  }
  return (data ?? []) as TestimonialRow[];
}

export async function createTestimonial(formData: FormData) {
  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    country: formData.get("country") || undefined,
    review: formData.get("review"),
    rating: formData.get("rating"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    ...parsed.data,
    country: parsed.data.country || null,
  });

  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}
