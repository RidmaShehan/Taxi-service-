"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings-defaults";
import { formatZodError, siteSettingsSchema } from "@/lib/validations";
import type { SiteSettings } from "@/types/site-settings";

const REVALIDATE_PATHS = [
  "/",
  "/fleet",
  "/reviews",
  "/booking",
  "/contact",
  "/maintenance",
  "/admin/settings",
];

function revalidateSite() {
  REVALIDATE_PATHS.forEach((p) => revalidatePath(p));
  revalidatePath("/", "layout");
}

function nullIfEmpty(v: string | undefined) {
  return v?.trim() ? v.trim() : null;
}

/** Use submitted value when present; otherwise keep existing (tabbed form omits other tabs). */
function pickFormField(
  formData: FormData,
  key: string,
  current: SiteSettings
): string | undefined {
  if (!formData.has(key)) {
    const existing = current[key as keyof SiteSettings];
    return typeof existing === "string" ? existing : undefined;
  }
  const raw = formData.get(key);
  if (raw === null) {
    const existing = current[key as keyof SiteSettings];
    return typeof existing === "string" ? existing : undefined;
  }
  const value = String(raw);
  return value;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !data) {
      return DEFAULT_SITE_SETTINGS;
    }

    return { ...DEFAULT_SITE_SETTINGS, ...(data as SiteSettings) };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function updateSiteSettings(formData: FormData) {
  const current = await getSiteSettings();

  const parsed = siteSettingsSchema.safeParse({
    site_name: pickFormField(formData, "site_name", current),
    site_description: pickFormField(formData, "site_description", current),
    meta_title: pickFormField(formData, "meta_title", current),
    meta_keywords: pickFormField(formData, "meta_keywords", current),
    meta_robots: pickFormField(formData, "meta_robots", current),
    canonical_url: pickFormField(formData, "canonical_url", current),
    og_title: pickFormField(formData, "og_title", current),
    og_description: pickFormField(formData, "og_description", current),
    og_image_url: pickFormField(formData, "og_image_url", current),
    logo_url: pickFormField(formData, "logo_url", current),
    favicon_url: pickFormField(formData, "favicon_url", current),
    phone: pickFormField(formData, "phone", current),
    email: pickFormField(formData, "email", current),
    whatsapp_phone: pickFormField(formData, "whatsapp_phone", current),
    address_street: pickFormField(formData, "address_street", current),
    address_locality: pickFormField(formData, "address_locality", current),
    address_region: pickFormField(formData, "address_region", current),
    postal_code: pickFormField(formData, "postal_code", current),
    address_country: pickFormField(formData, "address_country", current),
    address_display: pickFormField(formData, "address_display", current),
    contact_page_title: pickFormField(formData, "contact_page_title", current),
    contact_page_subtitle: pickFormField(formData, "contact_page_subtitle", current),
    contact_hub_title: pickFormField(formData, "contact_hub_title", current),
    map_embed_url: pickFormField(formData, "map_embed_url", current),
    map_link_url: pickFormField(formData, "map_link_url", current),
    hours_airport: pickFormField(formData, "hours_airport", current),
    hours_office: pickFormField(formData, "hours_office", current),
    hours_response: pickFormField(formData, "hours_response", current),
    hero_badge: pickFormField(formData, "hero_badge", current),
    hero_title: pickFormField(formData, "hero_title", current),
    hero_subtitle: pickFormField(formData, "hero_subtitle", current),
    hero_image_url: pickFormField(formData, "hero_image_url", current),
    hero_travelers_label: pickFormField(formData, "hero_travelers_label", current),
    stat_1_value: pickFormField(formData, "stat_1_value", current),
    stat_1_label: pickFormField(formData, "stat_1_label", current),
    stat_2_value: pickFormField(formData, "stat_2_value", current),
    stat_2_label: pickFormField(formData, "stat_2_label", current),
    stat_3_value: pickFormField(formData, "stat_3_value", current),
    stat_3_label: pickFormField(formData, "stat_3_label", current),
    stat_4_value: pickFormField(formData, "stat_4_value", current),
    stat_4_label: pickFormField(formData, "stat_4_label", current),
    footer_description: pickFormField(formData, "footer_description", current),
    cta_title: pickFormField(formData, "cta_title", current),
    cta_subtitle: pickFormField(formData, "cta_subtitle", current),
    facebook_url: pickFormField(formData, "facebook_url", current),
    twitter_url: pickFormField(formData, "twitter_url", current),
    instagram_url: pickFormField(formData, "instagram_url", current),
    maintenance_mode: formData.has("maintenance_mode")
      ? formData.get("maintenance_mode") === "true"
      : current.maintenance_mode,
    maintenance_message: pickFormField(formData, "maintenance_message", current),
  });

  if (!parsed.success) {
    return { error: formatZodError(parsed.error) };
  }

  const d = parsed.data;
  const supabase = await createClient();
  const payload = {
    id: 1,
    site_name: d.site_name,
    site_description: d.site_description,
    meta_title: d.meta_title,
    meta_keywords: nullIfEmpty(d.meta_keywords),
    meta_robots: nullIfEmpty(d.meta_robots),
    canonical_url: nullIfEmpty(d.canonical_url),
    og_title: nullIfEmpty(d.og_title),
    og_description: nullIfEmpty(d.og_description),
    og_image_url: nullIfEmpty(d.og_image_url),
    logo_url: nullIfEmpty(d.logo_url),
    favicon_url: nullIfEmpty(d.favicon_url),
    phone: d.phone,
    email: d.email,
    whatsapp_phone: d.whatsapp_phone,
    address_street: nullIfEmpty(d.address_street),
    address_locality: nullIfEmpty(d.address_locality),
    address_region: nullIfEmpty(d.address_region),
    postal_code: nullIfEmpty(d.postal_code),
    address_country: nullIfEmpty(d.address_country),
    address_display: nullIfEmpty(d.address_display),
    contact_page_title: nullIfEmpty(d.contact_page_title),
    contact_page_subtitle: nullIfEmpty(d.contact_page_subtitle),
    contact_hub_title: nullIfEmpty(d.contact_hub_title),
    map_embed_url: nullIfEmpty(d.map_embed_url),
    map_link_url: nullIfEmpty(d.map_link_url),
    hours_airport: nullIfEmpty(d.hours_airport),
    hours_office: nullIfEmpty(d.hours_office),
    hours_response: nullIfEmpty(d.hours_response),
    hero_badge: nullIfEmpty(d.hero_badge),
    hero_title: nullIfEmpty(d.hero_title),
    hero_subtitle: nullIfEmpty(d.hero_subtitle),
    hero_image_url: nullIfEmpty(d.hero_image_url),
    hero_travelers_label: nullIfEmpty(d.hero_travelers_label),
    stat_1_value: nullIfEmpty(d.stat_1_value),
    stat_1_label: nullIfEmpty(d.stat_1_label),
    stat_2_value: nullIfEmpty(d.stat_2_value),
    stat_2_label: nullIfEmpty(d.stat_2_label),
    stat_3_value: nullIfEmpty(d.stat_3_value),
    stat_3_label: nullIfEmpty(d.stat_3_label),
    stat_4_value: nullIfEmpty(d.stat_4_value),
    stat_4_label: nullIfEmpty(d.stat_4_label),
    footer_description: nullIfEmpty(d.footer_description),
    cta_title: nullIfEmpty(d.cta_title),
    cta_subtitle: nullIfEmpty(d.cta_subtitle),
    facebook_url: nullIfEmpty(d.facebook_url),
    twitter_url: nullIfEmpty(d.twitter_url),
    instagram_url: nullIfEmpty(d.instagram_url),
    maintenance_mode: d.maintenance_mode ?? false,
    maintenance_message: nullIfEmpty(d.maintenance_message),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("site_settings").upsert(payload, { onConflict: "id" });

  if (error) return { error: error.message };

  revalidateSite();
  return { success: true };
}

async function uploadSettingsImage(
  formData: FormData,
  column: "hero_image_url" | "og_image_url" | "logo_url" | "favicon_url"
) {
  const { fileToBase64DataUrl } = await import("@/lib/images");
  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided" };

  const result = await fileToBase64DataUrl(file);
  if ("error" in result) return { error: result.error };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ [column]: result.dataUrl, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) return { error: error.message };
  revalidateSite();
  return { url: result.dataUrl };
}

export async function uploadHeroImage(formData: FormData) {
  return uploadSettingsImage(formData, "hero_image_url");
}

export async function uploadOgImage(formData: FormData) {
  return uploadSettingsImage(formData, "og_image_url");
}

export async function uploadLogo(formData: FormData) {
  return uploadSettingsImage(formData, "logo_url");
}

export async function uploadFavicon(formData: FormData) {
  return uploadSettingsImage(formData, "favicon_url");
}
