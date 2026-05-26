"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { fileToBase64DataUrl } from "@/lib/images";
import { carSchema } from "@/lib/validations";
import type { CarRow } from "@/types/database.types";

const REVALIDATE_PATHS = ["/", "/fleet", "/admin", "/admin/fleet", "/admin/add-vehicle"];

function revalidateCars() {
  REVALIDATE_PATHS.forEach((p) => revalidatePath(p));
}

export async function getCars(options?: {
  featured?: boolean;
  excludeMaintenance?: boolean;
}): Promise<CarRow[]> {
  const supabase = await createClient();
  let query = supabase.from("cars").select("*").order("created_at", { ascending: false });

  if (options?.featured) {
    query = query.eq("featured", true);
  }
  if (options?.excludeMaintenance) {
    query = query.neq("status", "maintenance");
  }

  const { data, error } = await query;
  if (error) {
    console.error("getCars error:", error.message);
    return [];
  }
  return (data ?? []) as CarRow[];
}

export async function getCarById(id: string): Promise<CarRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("cars").select("*").eq("id", id).single();
  if (error) return null;
  return data as CarRow;
}

export async function createCar(formData: FormData) {
  const parsed = carSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    category: formData.get("category"),
    price_per_ride: formData.get("price_per_ride"),
    seats: formData.get("seats"),
    luggage: formData.get("luggage"),
    image_url: formData.get("image_url") || undefined,
    status: formData.get("status") || "available",
    featured: formData.get("featured") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("cars").insert({
    ...parsed.data,
    image_url: parsed.data.image_url || null,
    description: parsed.data.description || null,
  });

  if (error) return { error: error.message };

  revalidateCars();
  return { success: true };
}

export async function updateCar(id: string, formData: FormData) {
  const parsed = carSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    category: formData.get("category"),
    price_per_ride: formData.get("price_per_ride"),
    seats: formData.get("seats"),
    luggage: formData.get("luggage"),
    image_url: formData.get("image_url") || undefined,
    status: formData.get("status") || "available",
    featured: formData.get("featured") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("cars")
    .update({
      ...parsed.data,
      image_url: parsed.data.image_url || null,
      description: parsed.data.description || null,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateCars();
  return { success: true };
}

export async function deleteCar(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateCars();
  return { success: true };
}

export async function uploadCarImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) {
    return { error: "No file provided" };
  }

  const result = await fileToBase64DataUrl(file);
  if ("error" in result) return { error: result.error };

  return { url: result.dataUrl };
}

export async function setCarCover(carId: string, imageUrl: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("cars")
    .update({ image_url: imageUrl })
    .eq("id", carId);

  if (error) return { error: error.message };
  revalidateCars();
  return { success: true };
}
