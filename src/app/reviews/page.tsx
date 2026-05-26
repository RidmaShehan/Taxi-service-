import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { CTABanner } from "@/components/sections/cta-banner";
import { getReviews } from "@/lib/actions/reviews";
import { ensureSiteAvailable } from "@/lib/check-maintenance";

export default async function ReviewsPage() {
  const settings = await ensureSiteAvailable();
  const reviews = await getReviews({ approvedOnly: true });
  const avgRating =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
      : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <MarketingShell>
      <main className="pb-20">
        <div className="bg-[#f4f9ff] pt-20 pb-24 border-b border-blue-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              What Our Travelers Say
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Real stories from people who explored Sri Lanka with LankaRide.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-12">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-12 flex flex-wrap justify-between items-center gap-8">
            <div className="flex-1 text-center">
              <div className="flex justify-center text-amber-400 mb-2">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{avgRating || "—"}/5</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Average Rating</div>
            </div>
            <div className="flex-1 text-center border-l border-slate-100">
              <div className="text-2xl font-bold text-slate-900">{reviews.length}</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Verified Reviews</div>
            </div>
            <div className="flex-1 text-center border-l border-slate-100">
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-xs font-medium text-slate-500 mt-1">On-Time Pickups</div>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No reviews published yet. Be the first to share your experience after your trip!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex text-amber-400 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 flex-1 italic">
                    &quot;{review.review}&quot;
                  </p>
                  {review.route && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                      <MapPin className="w-3 h-3" />
                      {review.route}
                    </div>
                  )}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                    <div className="w-10 h-10 rounded-full bg-[#1e90ff] text-white flex items-center justify-center font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{review.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {review.country ?? new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mb-12">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#1e90ff] hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-sm font-bold transition-colors"
            >
              Book Your Transfer →
            </Link>
          </div>
        </div>

        <CTABanner settings={settings} />
      </main>
      </MarketingShell>
    </div>
  );
}
