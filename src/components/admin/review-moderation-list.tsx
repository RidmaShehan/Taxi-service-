"use client";

import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { approveReview, declineReview } from "@/lib/actions/reviews";
import type { ReviewRow } from "@/types/database.types";

export function ReviewModerationList({ reviews }: { reviews: ReviewRow[] }) {
  const router = useRouter();

  if (reviews.length === 0) {
    return <p className="text-sm text-slate-500">No pending reviews.</p>;
  }

  async function handleApprove(id: string) {
    await approveReview(id);
    router.refresh();
  }

  async function handleDecline(id: string) {
    await declineReview(id);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-slate-100 pb-6 last:border-0">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-sm font-bold text-slate-900">{review.name}</div>
              <div className="text-xs text-amber-500 mt-0.5">{"★".repeat(review.rating)}</div>
            </div>
            <div className="text-[10px] font-medium text-slate-400">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </div>
          <p className="text-xs text-slate-600 italic mb-4 leading-relaxed">&quot;{review.review}&quot;</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(review.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Approve
            </button>
            <button
              onClick={() => handleDecline(review.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-red-100 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              <X className="w-3.5 h-3.5" /> Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
