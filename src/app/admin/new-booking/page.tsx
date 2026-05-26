import { getCars } from "@/lib/actions/cars";
import { BookingForm } from "@/components/admin/booking-form";

export default async function NewBookingPage() {
  const cars = await getCars();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">New Booking</h1>
      <p className="text-sm text-slate-500 mb-8">Manually create a booking for a customer.</p>
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
        <BookingForm cars={cars} />
      </div>
    </div>
  );
}
