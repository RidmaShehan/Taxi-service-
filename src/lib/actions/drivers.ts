"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { driverSchema } from "@/lib/validations";
import type { DriverRow } from "@/types/database.types";

function revalidate() {
  ["/admin/manage-drivers"].forEach((p) => revalidatePath(p));
}

export async function getDrivers(): Promise<DriverRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getDrivers error:", error.message);
    return [];
  }
  return (data ?? []) as DriverRow[];
}

export async function createDriver(formData: FormData) {
  const parsed = driverSchema.safeParse({
    name: formData.get("name"),
    driver_code: formData.get("driver_code"),
    phone: formData.get("phone"),
    status: formData.get("status") || "available",
    rating: formData.get("rating") || 5,
    car_id: formData.get("car_id") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("drivers").insert({
    ...parsed.data,
    car_id: parsed.data.car_id || null,
  });

  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}

export async function updateDriver(id: string, formData: FormData) {
  const parsed = driverSchema.safeParse({
    name: formData.get("name"),
    driver_code: formData.get("driver_code"),
    phone: formData.get("phone"),
    status: formData.get("status") || "available",
    rating: formData.get("rating") || 5,
    car_id: formData.get("car_id") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("drivers")
    .update({
      ...parsed.data,
      car_id: parsed.data.car_id || null,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}

export async function deleteDriver(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("drivers").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}
