"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial } from "@/lib/actions/testimonials";

export function TestimonialForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("rating", String(rating));
    const result = await createTestimonial(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    router.refresh();
    setLoading(false);
    (e.target as HTMLFormElement).reset();
    setRating(5);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Customer Name</label>
        <input name="name" required placeholder="Enter customer name" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Country</label>
        <input name="country" placeholder="Optional" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Review</label>
        <textarea name="review" required rows={3} placeholder="Customer feedback" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm resize-none" />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm">
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} stars</option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-[#1e90ff] text-white py-3 rounded-lg text-sm font-bold disabled:opacity-50">
        {loading ? "Saving..." : "Save Testimonial"}
      </button>
    </form>
  );
}
