import Link from "next/link";
import { Star } from "lucide-react";
import { DbImage } from "@/components/ui/db-image";
import type { SiteSettings } from "@/types/site-settings";

type Props = { settings: SiteSettings };

export function Hero({ settings }: Props) {
  const heroImage =
    settings.hero_image_url ??
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070";

  return (
    <div className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          {settings.hero_badge && (
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1e90ff] text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider">
              {settings.hero_badge}
            </div>
          )}

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 whitespace-pre-line">
            {settings.hero_title ?? "Reliable Airport Taxi Service"}
          </h1>

          {settings.hero_subtitle && (
            <p className="text-slate-600 text-lg max-w-md leading-relaxed">{settings.hero_subtitle}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/booking"
              className="bg-[#1e90ff] hover:bg-blue-600 transition-colors text-white px-8 py-3.5 rounded-lg text-sm font-medium text-center"
            >
              Book Now
            </Link>
            <Link
              href="/fleet"
              className="border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 px-8 py-3.5 rounded-lg text-sm font-medium text-center"
            >
              Explore Fleet
            </Link>
          </div>

          {settings.hero_travelers_label && (
            <div className="flex items-center gap-4 pt-4">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs font-medium text-slate-600">
                <span className="font-bold text-slate-900">{settings.hero_travelers_label}</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <DbImage
              src={heroImage}
              alt={settings.site_name}
              width={800}
              height={500}
              className="w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
