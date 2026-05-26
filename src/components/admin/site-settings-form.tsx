"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateSiteSettings,
  uploadHeroImage,
  uploadOgImage,
  uploadLogo,
  uploadFavicon,
} from "@/lib/actions/site-settings";
import { MAX_IMAGE_SIZE_BYTES, validateImageFile } from "@/lib/images";
import type { SiteSettings } from "@/types/site-settings";

type Tab = "seo" | "hero" | "contact" | "general";

type Props = { settings: SiteSettings };

export function SiteSettingsForm({ settings }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("seo");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState(settings.hero_image_url ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(settings.og_image_url ?? "");
  const [logoUrl, setLogoUrl] = useState(settings.logo_url ?? "");
  const [faviconUrl, setFaviconUrl] = useState(settings.favicon_url ?? "");

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "hero" | "og" | "logo" | "favicon"
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const clientError = validateImageFile(file);
    if (clientError) {
      setError(clientError);
      return;
    }
    const fd = new FormData();
    fd.set("file", file);
    const uploaders = {
      hero: uploadHeroImage,
      og: uploadOgImage,
      logo: uploadLogo,
      favicon: uploadFavicon,
    };
    const result = await uploaders[type](fd);
    if (result.url) {
      if (type === "hero") setHeroImageUrl(result.url);
      else if (type === "og") setOgImageUrl(result.url);
      else if (type === "logo") setLogoUrl(result.url);
      else setFaviconUrl(result.url);
      setSuccess(true);
      setError(null);
    } else if (result.error) setError(result.error);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    // Always include uploaded images (fields may be on another tab)
    if (heroImageUrl) formData.set("hero_image_url", heroImageUrl);
    if (ogImageUrl) formData.set("og_image_url", ogImageUrl);
    if (logoUrl) formData.set("logo_url", logoUrl);
    if (faviconUrl) formData.set("favicon_url", faviconUrl);
    const result = await updateSiteSettings(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setLoading(false);
    router.refresh();
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "seo", label: "SEO & Meta Tags" },
    { id: "hero", label: "Hero Section" },
    { id: "contact", label: "Contact & Map" },
    { id: "general", label: "General" },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              tab === t.id
                ? "bg-[#1e90ff] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {tab === "seo" && (
          <section className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">SEO & meta tags</h2>
              <p className="text-sm text-slate-500 mt-1">
                Controls browser title, search description, and social share previews (Open Graph).
              </p>
            </div>
            <Field label="Site name" name="site_name" defaultValue={settings.site_name} />
            <Field label="Meta title (browser tab)" name="meta_title" defaultValue={settings.meta_title} />
            <Field
              label="Meta description"
              name="site_description"
              defaultValue={settings.site_description}
              multiline
              hint="Shown in Google search results (~150 characters)"
            />
            <Field
              label="Meta keywords"
              name="meta_keywords"
              defaultValue={settings.meta_keywords ?? ""}
              hint="Comma-separated, e.g. airport taxi, colombo transfer"
            />
            <Field
              label="Robots meta"
              name="meta_robots"
              defaultValue={settings.meta_robots ?? "index, follow"}
              hint="e.g. index, follow or noindex, nofollow"
            />
            <Field
              label="Canonical URL"
              name="canonical_url"
              defaultValue={settings.canonical_url ?? ""}
              hint="Full URL of your homepage (optional)"
            />
            <hr className="border-slate-100" />
            <p className="text-xs font-bold text-slate-500 uppercase">Open Graph (Facebook / WhatsApp share)</p>
            <Field label="OG title" name="og_title" defaultValue={settings.og_title ?? settings.meta_title} />
            <Field
              label="OG description"
              name="og_description"
              defaultValue={settings.og_description ?? settings.site_description}
              multiline
            />
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">OG image</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => handleImageUpload(e, "og")}
                className="text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Max {MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB — 1200×630 recommended</p>
              {ogImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ogImageUrl} alt="OG preview" className="mt-2 h-24 rounded-lg object-cover" />
              )}
            </div>
          </section>
        )}

        {tab === "hero" && (
          <section className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Homepage hero</h2>
              <p className="text-sm text-slate-500 mt-1">Main banner on the homepage — text and image.</p>
            </div>
            <Field label="Badge text" name="hero_badge" defaultValue={settings.hero_badge ?? ""} />
            <Field
              label="Headline"
              name="hero_title"
              defaultValue={settings.hero_title ?? ""}
              multiline
              hint="Use Enter for line breaks"
            />
            <Field label="Subtitle" name="hero_subtitle" defaultValue={settings.hero_subtitle ?? ""} multiline />
            <Field
              label="Travelers / trust label"
              name="hero_travelers_label"
              defaultValue={settings.hero_travelers_label ?? ""}
            />
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hero image</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => handleImageUpload(e, "hero")}
                className="text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Max {MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB — saved in database</p>
              {heroImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroImageUrl} alt="Hero preview" className="mt-2 h-40 rounded-lg object-cover w-full max-w-md" />
              )}
            </div>
          </section>
        )}

        {tab === "contact" && (
          <section className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Contact page & map</h2>
              <p className="text-sm text-slate-500 mt-1">
                Phone, email, address, map embed, and hours shown on the Contact page.
              </p>
            </div>
            <Field
              label="Contact page title"
              name="contact_page_title"
              defaultValue={settings.contact_page_title ?? ""}
            />
            <Field
              label="Contact page subtitle"
              name="contact_page_subtitle"
              defaultValue={settings.contact_page_subtitle ?? ""}
              multiline
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Phone" name="phone" defaultValue={settings.phone} />
              <Field label="Email" name="email" type="email" defaultValue={settings.email} />
            </div>
            <Field label="WhatsApp (digits only)" name="whatsapp_phone" defaultValue={settings.whatsapp_phone} />
            <Field
              label="Full address (display)"
              name="address_display"
              defaultValue={settings.address_display ?? ""}
              multiline
              hint="Shown on contact page and map card"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Street" name="address_street" defaultValue={settings.address_street ?? ""} />
              <Field label="City" name="address_locality" defaultValue={settings.address_locality ?? ""} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Region" name="address_region" defaultValue={settings.address_region ?? ""} />
              <Field label="Postal code" name="postal_code" defaultValue={settings.postal_code ?? ""} />
            </div>
            <Field label="Country" name="address_country" defaultValue={settings.address_country ?? ""} />
            <Field label="Map location title" name="contact_hub_title" defaultValue={settings.contact_hub_title ?? ""} />
            <Field
              label="Google Maps embed URL"
              name="map_embed_url"
              defaultValue={settings.map_embed_url ?? ""}
              multiline
              hint="Google Maps → Share → Embed a map → copy iframe src= URL only"
            />
            <Field
              label="Google Maps link"
              name="map_link_url"
              defaultValue={settings.map_link_url ?? ""}
              hint="Opens when user clicks Get Directions"
            />
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Airport hours" name="hours_airport" defaultValue={settings.hours_airport ?? ""} />
              <Field label="Office hours" name="hours_office" defaultValue={settings.hours_office ?? ""} />
              <Field label="Response time" name="hours_response" defaultValue={settings.hours_response ?? ""} />
            </div>
          </section>
        )}

        {tab === "general" && (
          <>
            <section className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Site logo &amp; favicon</h2>
              <p className="text-sm text-slate-500">
                Logo appears in the header. Favicon appears in the browser tab. Max{" "}
                {MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB each (PNG recommended for favicon).
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    Site logo
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(e) => handleImageUpload(e, "logo")}
                    className="text-sm"
                  />
                  {logoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logoUrl} alt="Logo preview" className="mt-2 h-12 object-contain" />
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    Favicon
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/x-icon"
                    onChange={(e) => handleImageUpload(e, "favicon")}
                    className="text-sm"
                  />
                  {faviconUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={faviconUrl} alt="Favicon preview" className="mt-2 h-8 w-8 object-contain" />
                  )}
                </div>
              </div>
            </section>
            <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Maintenance mode</h2>
              <p className="text-sm text-slate-600">
                Or use the <strong>Maintenance ON/OFF</strong> button at the top of every admin page
                for a quick toggle.
              </p>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="maintenance_mode"
                  value="true"
                  defaultChecked={settings.maintenance_mode}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold">Show maintenance page to visitors</span>
              </label>
              <Field
                label="Maintenance message"
                name="maintenance_message"
                defaultValue={settings.maintenance_message ?? ""}
                multiline
              />
            </section>
            <section className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Homepage stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stat 1 value" name="stat_1_value" defaultValue={settings.stat_1_value ?? ""} />
                <Field label="Stat 1 label" name="stat_1_label" defaultValue={settings.stat_1_label ?? ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stat 2 value" name="stat_2_value" defaultValue={settings.stat_2_value ?? ""} />
                <Field label="Stat 2 label" name="stat_2_label" defaultValue={settings.stat_2_label ?? ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stat 3 value" name="stat_3_value" defaultValue={settings.stat_3_value ?? ""} />
                <Field label="Stat 3 label" name="stat_3_label" defaultValue={settings.stat_3_label ?? ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stat 4 value" name="stat_4_value" defaultValue={settings.stat_4_value ?? ""} />
                <Field label="Stat 4 label" name="stat_4_label" defaultValue={settings.stat_4_label ?? ""} />
              </div>
            </section>
            <section className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Footer, CTA & social</h2>
              <Field label="Footer description" name="footer_description" defaultValue={settings.footer_description ?? ""} multiline />
              <Field label="CTA title" name="cta_title" defaultValue={settings.cta_title ?? ""} />
              <Field label="CTA subtitle" name="cta_subtitle" defaultValue={settings.cta_subtitle ?? ""} multiline />
              <Field label="Facebook URL" name="facebook_url" defaultValue={settings.facebook_url ?? ""} />
              <Field label="Twitter URL" name="twitter_url" defaultValue={settings.twitter_url ?? ""} />
              <Field label="Instagram URL" name="instagram_url" defaultValue={settings.instagram_url ?? ""} />
            </section>
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
      {success && <p className="text-sm text-emerald-600 mt-4">Settings saved successfully.</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 px-8 py-3 bg-[#1e90ff] text-white rounded-lg text-sm font-bold disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save all settings"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  multiline,
  hint,
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={3}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm"
        />
      )}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}
