import { getSiteSettings } from "@/lib/actions/site-settings";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Site settings</h1>
      <p className="text-sm text-slate-500 mb-8">
        Edit SEO meta tags, homepage hero, contact &amp; map, and general site options. Changes apply to the public website immediately after save.
      </p>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
