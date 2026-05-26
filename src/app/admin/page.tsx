import Link from "next/link";
import { Users, Car, Star, Clock, type LucideIcon } from "lucide-react";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { getBookings } from "@/lib/actions/bookings";
import { getReviews } from "@/lib/actions/reviews";
import { ReviewModerationList } from "@/components/admin/review-moderation-list";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function AdminDashboard() {
  const [stats, bookings, pendingReviews] = await Promise.all([
    getDashboardStats(),
    getBookings(5),
    getReviews({ pendingOnly: true }),
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back. Here&apos;s what&apos;s happening with LankaRide today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/new-booking" className="px-5 py-2.5 bg-[#1e90ff] text-white rounded-lg text-sm font-semibold hover:bg-blue-600">
            New Booking
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard icon={Users} label="Total Bookings" value={String(stats.totalBookings)} />
        <StatCard icon={Car} label="Active Fleet" value={String(stats.activeFleet)} />
        <StatCard icon={Star} label="Pending Reviews" value={String(stats.pendingReviews)} />
        <StatCard icon={Star} label="Avg. Rating" value={`${stats.avgRating} / 5`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
                <p className="text-xs text-slate-500 mt-1">Latest pickup requests.</p>
              </div>
              <Link href="/admin/bookings" className="text-sm font-semibold text-[#1e90ff] hover:underline">
                View All
              </Link>
            </div>
            {bookings.length === 0 ? (
              <p className="text-sm text-slate-500">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm text-left">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-100">
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Route</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td className="py-4">
                          <div className="font-bold text-slate-900">{b.name}</div>
                          <div className="text-xs text-slate-500">{b.email}</div>
                        </td>
                        <td className="py-4 text-slate-600">
                          {b.pickup_location} → {b.destination}
                        </td>
                        <td className="py-4 text-slate-600">
                          <div>{new Date(b.date_time).toLocaleDateString()}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(b.date_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </td>
                        <td className="py-4">
                          <StatusBadge status={b.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-slate-900">Review Moderation</h2>
              {pendingReviews.length > 0 && (
                <span className="bg-blue-50 text-[#1e90ff] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pendingReviews.length}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-6">Approve or decline customer reviews.</p>
            <ReviewModerationList reviews={pendingReviews.slice(0, 3)} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Add Testimonial</h2>
            <p className="text-xs text-slate-500 mb-6">Manually add reviews collected offline.</p>
            <TestimonialForm />
          </div>

          <div className="bg-[#f4f9ff] rounded-2xl border border-blue-50 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickLink href="/admin/add-vehicle" label="Add Vehicle" />
              <QuickLink href="/admin/new-booking" label="New Booking" />
              <QuickLink href="/admin/manage-drivers" label="Drivers" />
              <QuickLink href="/admin/gallery-view" label="Gallery" />
              <QuickLink href="/admin/settings" label="Site Settings" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-sm text-slate-500 font-medium mb-1">{label}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-600",
    confirmed: "bg-emerald-50 text-emerald-600",
    cancelled: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${colors[status] ?? colors.pending}`}>
      {status}
    </span>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="bg-white p-3.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 hover:border-[#1e90ff] hover:text-[#1e90ff] text-center transition-all shadow-sm">
      {label}
    </Link>
  );
}
