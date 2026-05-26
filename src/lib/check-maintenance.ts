import { redirect } from "next/navigation";
import { getSiteSettings } from "@/lib/actions/site-settings";

/** Redirect public pages to /maintenance when maintenance mode is on. */
export async function ensureSiteAvailable() {
  const settings = await getSiteSettings();
  if (settings.maintenance_mode) {
    redirect("/maintenance");
  }
  return settings;
}
