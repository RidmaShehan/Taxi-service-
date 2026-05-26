import { Star } from "lucide-react";
import Link from "next/link";
import type { TestimonialRow } from "@/types/database.types";

type Props = { testimonials: TestimonialRow[] };

export function TestimonialsSection({ testimonials }: Props) {
  if (testimonials.length === 0) {
    return (
      <div className="py-24 bg-[#f4f9ff]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">What Our Travelers Say</h2>
          <p className="text-slate-600 text-sm">Customer testimonials will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-[#f4f9ff]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">What Our Travelers Say</h2>
          <p className="text-slate-600 text-sm">
            Real feedback from travelers who trusted LankaRide for their Sri Lankan journeys.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex text-amber-400 mb-6">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-8 italic">
                &quot;{t.review}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#1e90ff] text-white flex items-center justify-center font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{t.name}</div>
                  {t.country && (
                    <div className="text-[11px] font-medium text-slate-500">{t.country}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/reviews" className="text-sm font-semibold text-slate-600 hover:text-[#1e90ff] flex items-center justify-center gap-2">
            Read More Reviews <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
