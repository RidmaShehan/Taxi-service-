import Link from "next/link";
import { getSiteSettings } from "@/lib/actions/site-settings";

export default async function MaintenancePage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-[#1e90ff] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
          LR
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">We&apos;ll be back soon</h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          {settings.maintenance_message ??
            "Our website is temporarily under maintenance. Thank you for your patience."}
        </p>
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${settings.whatsapp_phone}`}
            className="bg-[#25D366] text-white py-3 rounded-xl text-sm font-bold"
          >
            Contact on WhatsApp
          </a>
          <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-[#1e90ff] text-sm font-semibold">
            Call {settings.phone}
          </a>
          <Link href="/login" className="text-xs text-slate-400 hover:text-slate-600">
            Admin login
          </Link>
        </div>
      </div>
    </div>
  );
}
