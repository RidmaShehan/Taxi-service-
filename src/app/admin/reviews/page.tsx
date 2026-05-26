import { getReviews } from "@/lib/actions/reviews";
import { getTestimonials } from "@/lib/actions/testimonials";
import { ReviewModerationList } from "@/components/admin/review-moderation-list";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function AdminReviewsPage() {
  const [pendingReviews, approvedReviews, testimonials] = await Promise.all([
    getReviews({ pendingOnly: true }),
    getReviews({ approvedOnly: true }),
    getTestimonials(),
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Reviews</h1>
      <p className="text-sm text-slate-500 mb-8">Moderate customer reviews and manage testimonials.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Pending Reviews ({pendingReviews.length})
          </h2>
          <ReviewModerationList reviews={pendingReviews} />
        </div>

        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Add Testimonial</h2>
          <TestimonialForm />
        </div>
      </div>

      <div className="mt-8 bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Approved Reviews ({approvedReviews.length})</h2>
        {approvedReviews.length === 0 ? (
          <p className="text-sm text-slate-500">No approved reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {approvedReviews.map((r) => (
              <div key={r.id} className="border-b border-slate-100 pb-4 last:border-0">
                <div className="font-bold text-slate-900">{r.name}</div>
                <div className="text-xs text-amber-500">{"★".repeat(r.rating)}</div>
                <p className="text-sm text-slate-600 mt-1">{r.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Testimonials ({testimonials.length})</h2>
        {testimonials.length === 0 ? (
          <p className="text-sm text-slate-500">No testimonials yet.</p>
        ) : (
          <div className="space-y-4">
            {testimonials.map((t) => (
              <div key={t.id} className="border-b border-slate-100 pb-4 last:border-0">
                <div className="font-bold text-slate-900">{t.name}{t.country ? ` · ${t.country}` : ""}</div>
                <div className="text-xs text-amber-500">{"★".repeat(t.rating)}</div>
                <p className="text-sm text-slate-600 mt-1">{t.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
