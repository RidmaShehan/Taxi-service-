import Link from "next/link";
import { getBookings } from "@/lib/actions/bookings";
import { BookingsTable } from "@/components/admin/bookings-table";

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Bookings</h1>
          <p className="text-sm text-slate-500">Manage all customer booking requests.</p>
        </div>
        <Link href="/admin/new-booking" className="px-4 py-2.5 rounded-lg bg-[#1e90ff] text-white text-sm font-semibold inline-flex items-center justify-center">
          New Booking
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Stat label="Total" value={bookings.length} />
        <Stat label="Pending" value={bookings.filter((b) => b.status === "pending").length} />
        <Stat label="Confirmed" value={bookings.filter((b) => b.status === "confirmed").length} />
      </div>

      <BookingsTable bookings={bookings} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
    </div>
  );
}
