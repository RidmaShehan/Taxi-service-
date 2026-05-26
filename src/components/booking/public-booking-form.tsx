"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  Car,
  CreditCard,
  ShieldCheck,
  Clock,
  PhoneCall,
  Star,
  CheckCircle2,
} from "lucide-react";
import { createBooking } from "@/lib/actions/bookings";
import type { CarRow, TestimonialRow } from "@/types/database.types";
import type { SiteSettings } from "@/types/site-settings";

type Props = {
  cars: CarRow[];
  settings: SiteSettings;
  sidebarTestimonial?: TestimonialRow | null;
};

export function PublicBookingForm({ cars, settings, sidebarTestimonial }: Props) {
  const [selectedCarId, setSelectedCarId] = useState<string>(cars[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedCar = cars.find((c) => c.id === selectedCarId);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    formData.set("name", formData.get("fullName") as string);
    formData.set("pickup_location", formData.get("pickup") as string);
    formData.set("date_time", new Date(`${date}T${time}`).toISOString());
    formData.set("vehicle_type", selectedCar?.name ?? "");
    if (selectedCarId) formData.set("car_id", selectedCarId);
    formData.delete("fullName");
    formData.delete("pickup");
    formData.delete("date");
    formData.delete("time");

    const result = await createBooking(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    (e.target as HTMLFormElement).reset();
    setSelectedCarId(cars[0]?.id ?? "");
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 bg-[#f8fafc] text-slate-900 min-h-screen">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Book Your Journey</h1>
          <p className="text-slate-600 text-sm">Reliable airport transfers and island-wide tours at your fingertips.</p>
        </div>

        {success && (
          <div className="mb-6 flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
            <CheckCircle2 className="w-5 h-5" />
            Booking request received! Our team will contact you shortly.
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                    <User className="w-5 h-5 text-[#1e90ff]" />
                    Passenger Information
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Your full name"
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Phone (WhatsApp Preferred)</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+94 77 000 0000"
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                      required
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                    <MapPin className="w-5 h-5 text-[#1e90ff]" />
                    Trip Details
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Pickup Location</label>
                      <select
                        name="pickup"
                        defaultValue="Bandaranaike International Airport (CMB)"
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                      >
                        <option>Bandaranaike International Airport (CMB)</option>
                        <option>Colombo City Center</option>
                        <option>Negombo Hotels</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Destination Address</label>
                      <input
                        type="text"
                        name="destination"
                        placeholder="Hotel name or city"
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">Date</label>
                        <input type="date" name="date" required className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">Preferred Time</label>
                        <input type="time" name="time" required className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Passengers</label>
                      <input type="number" name="passenger_count" min={1} defaultValue={1} required className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Special Requests (optional)</label>
                      <textarea name="message" rows={2} placeholder="Flight number, child seat, luggage notes..." className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] resize-none" />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                    <Car className="w-5 h-5 text-[#1e90ff]" />
                    Choose Your Ride
                  </div>
                  {cars.length === 0 ? (
                    <p className="text-sm text-slate-500">No vehicles available. Please contact us directly.</p>
                  ) : (
                    <div className="space-y-4">
                      {cars.map((car) => (
                        <button
                          key={car.id}
                          type="button"
                          onClick={() => setSelectedCarId(car.id)}
                          className={`w-full flex items-center justify-between p-5 border rounded-2xl transition-all ${
                            selectedCarId === car.id
                              ? "border-[#1e90ff] bg-blue-50/50 ring-1 ring-[#1e90ff]"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xl">🚗</div>
                            <div>
                              <div className="font-bold text-sm text-slate-900">{car.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{car.category} • {car.seats} Seats • ${car.price_per_ride}/ride</div>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCarId === car.id ? "border-[#1e90ff]" : "border-slate-300"}`}>
                            {selectedCarId === car.id && <div className="w-2.5 h-2.5 bg-[#1e90ff] rounded-full" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="border-slate-100" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">PAY THE DRIVER</div>
                      <div className="text-xl font-bold text-slate-900">
                        {selectedCar ? `From $${selectedCar.price_per_ride}` : "Quote on request"}
                      </div>
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading || cars.length === 0}
                    className="w-full sm:w-auto bg-[#1e90ff] hover:bg-blue-600 transition-colors text-white px-10 py-4 rounded-xl text-sm font-bold shadow-sm disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Booking →"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-[#1e90ff] px-6 py-4 flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                LankaRide Guarantee
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 text-[#1e90ff] flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-slate-900 mb-1">24/7 Availability</div>
                    <div className="text-xs text-slate-500">Our drivers are ready whenever your flight lands.</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-[#1e90ff] flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-slate-900 mb-1">Door-to-Door Service</div>
                    <div className="text-xs text-slate-500">Drop-offs at your hotel or guesthouse anywhere on the island.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f4f9ff] rounded-3xl p-6 border border-blue-50 text-center">
              <div className="text-sm font-medium text-slate-600 mb-1">Need immediate help?</div>
              <div className="font-bold text-slate-900 mb-4">Contact Support</div>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 w-full bg-[#1e90ff] hover:bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold transition-colors mb-3"
              >
                <PhoneCall className="w-4 h-4" />
                {settings.phone}
              </a>
            </div>

            {sidebarTestimonial && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                <div className="flex text-amber-400 mb-3">
                  {Array.from({ length: sidebarTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  &quot;{sidebarTestimonial.review}&quot;
                </p>
                <div className="font-bold text-xs text-slate-900">{sidebarTestimonial.name}</div>
                {sidebarTestimonial.country && (
                  <div className="text-[10px] text-slate-500">{sidebarTestimonial.country}</div>
                )}
              </div>
            )}
          </div>
        </div>
    </main>
  );
}
