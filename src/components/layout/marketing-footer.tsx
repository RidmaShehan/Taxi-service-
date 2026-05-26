import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import type { SiteSettings } from "@/types/site-settings";

type Props = { settings: SiteSettings };

function SocialLink({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1e90ff] hover:bg-blue-50 transition-colors"
    >
      {children}
    </a>
  );
}

export function MarketingFooter({ settings }: Props) {
  const address = [settings.address_locality, settings.address_region]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e90ff] text-white font-bold text-sm">
                LR
              </div>
              <div className="font-bold text-xl tracking-tight text-[#1e90ff]">{settings.site_name}</div>
            </Link>

            {settings.footer_description && (
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">{settings.footer_description}</p>
            )}

            <div className="flex gap-4">
              <SocialLink href={settings.facebook_url}><Facebook className="w-4 h-4" /></SocialLink>
              <SocialLink href={settings.twitter_url}><Twitter className="w-4 h-4" /></SocialLink>
              <SocialLink href={settings.instagram_url}><Instagram className="w-4 h-4" /></SocialLink>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="font-bold text-slate-900 mb-6 text-sm">Quick Links</div>
            <div className="space-y-4 text-sm">
              <Link href="/" className="block text-slate-500 hover:text-[#1e90ff]">Home</Link>
              <Link href="/fleet" className="block text-slate-500 hover:text-[#1e90ff]">Our Fleet</Link>
              <Link href="/reviews" className="block text-slate-500 hover:text-[#1e90ff]">Reviews</Link>
              <Link href="/contact" className="block text-slate-500 hover:text-[#1e90ff]">Contact</Link>
              <Link href="/login" className="block text-slate-500 hover:text-[#1e90ff]">Admin Login</Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-bold text-slate-900 mb-6 text-sm">Services</div>
            <div className="space-y-4 text-sm text-slate-500">
              <div>Airport Transfers</div>
              <div>Sightseeing Tours</div>
              <div>Corporate Travel</div>
              <div>Intercity Rides</div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-bold text-slate-900 mb-6 text-sm">Contact Us</div>
            <div className="space-y-4 text-sm mb-8">
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-slate-500 hover:text-[#1e90ff]">
                📞 {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-slate-500 hover:text-[#1e90ff]">
                ✉️ {settings.email}
              </a>
              {address && (
                <div className="flex items-center gap-3 text-slate-500">📍 {address}</div>
              )}
            </div>
            <a
              href={`https://wa.me/${settings.whatsapp_phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-50 text-slate-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors w-full"
            >
              <span className="text-[#25D366] text-lg">💬</span> WhatsApp Chat
            </a>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {settings.site_name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
