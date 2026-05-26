"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { galleryImageSchema } from "@/lib/validations";
import type { GalleryImageRow } from "@/types/database.types";
import { fileToBase64DataUrl } from "@/lib/images";
import { setCarCover } from "./cars";

function revalidate() {
  ["/fleet", "/admin/gallery-view"].forEach((p) => revalidatePath(p));
}

export async function getGalleryImages(visibleOnly = false): Promise<GalleryImageRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  if (visibleOnly) query = query.eq("is_visible", true);

  const { data, error } = await query;
  if (error) {
    console.error("getGalleryImages error:", error.message);
    return [];
  }
  return (data ?? []) as GalleryImageRow[];
}

export async function uploadGalleryImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) {
    return { error: "No file provided" };
  }

  const encoded = await fileToBase64DataUrl(file);
  if ("error" in encoded) return { error: encoded.error };

  const caption = (formData.get("caption") as string) || null;
  const carId = (formData.get("car_id") as string) || null;

  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").insert({
    image_url: encoded.dataUrl,
    caption,
    car_id: carId || null,
    is_visible: true,
    sort_order: Date.now(),
  });

  if (error) return { error: error.message };
  revalidate();
  return { success: true, url: encoded.dataUrl };
}

export async function toggleGalleryVisibility(id: string, isVisible: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("gallery_images")
    .update({ is_visible: isVisible })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}

export async function setGalleryCarCover(carId: string, imageUrl: string) {
  return setCarCover(carId, imageUrl);
}

export async function createGalleryFromUrl(formData: FormData) {
  const parsed = galleryImageSchema.safeParse({
    image_url: formData.get("image_url"),
    caption: formData.get("caption") || undefined,
    car_id: formData.get("car_id") || undefined,
    is_visible: formData.get("is_visible") !== "false",
    sort_order: formData.get("sort_order") || Date.now(),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").insert({
    ...parsed.data,
    caption: parsed.data.caption || null,
    car_id: parsed.data.car_id || null,
  });

  if (error) return { error: error.message };
  revalidate();
  return { success: true };
}
