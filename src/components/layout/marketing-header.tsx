"use client";

import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { marketingNav } from "@/config/navigation";
import { DbImage } from "@/components/ui/db-image";
import type { SiteSettings } from "@/types/site-settings";

type Props = { settings: SiteSettings };

export function MarketingHeader({ settings }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const telHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  return (
    <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {settings.logo_url ? (
              <DbImage
                src={settings.logo_url}
                alt={settings.site_name}
                className="h-10 w-auto max-w-[140px] object-contain"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e90ff] text-white font-bold text-sm">
                LR
              </div>
            )}
            <div className="font-bold text-xl tracking-tight text-[#1e90ff]">{settings.site_name}</div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-slate-600 hover:text-[#1e90ff] transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={telHref}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-[#1e90ff] px-4 py-2 rounded-full border border-slate-200"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <Link
              href="/booking"
              className="bg-[#1e90ff] hover:bg-blue-600 transition-colors text-white px-6 py-2.5 rounded-full text-sm font-medium"
            >
              Book a Ride
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-600">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t py-6 bg-white">
            <nav className="flex flex-col gap-y-6 text-lg">
              {marketingNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-600 hover:text-[#1e90ff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="bg-[#1e90ff] text-white py-4 text-center rounded-full font-medium mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Ride
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
