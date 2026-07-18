"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { getSiteSettings } from "@/lib/actions/site-settings";

const PATHS = ["/", "/fleet", "/reviews", "/booking", "/contact", "/maintenance", "/admin"];

function revalidateAll() {
  PATHS.forEach((p) => revalidatePath(p));
  revalidatePath("/", "layout");
}

export async function getMaintenanceStatus() {
  const settings = await getSiteSettings();
  return {
    enabled: settings.maintenance_mode,
    message: settings.maintenance_message,
  };
}

export async function toggleMaintenanceMode(): Promise<{ enabled: boolean } | { error: string }> {
  const auth = await requireAdmin();
  if (auth.error || !auth.supabase) return { error: auth.error ?? "Unauthorized" };

  const current = await getSiteSettings();
  const next = !current.maintenance_mode;

  const { error } = await auth.supabase
    .from("site_settings")
    .update({
      maintenance_mode: next,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) return { error: error.message };

  revalidateAll();
  return { enabled: next };
}
