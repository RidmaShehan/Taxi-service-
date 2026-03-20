"use client";

import { useState } from "react";
import { User, MapPin, Car, CreditCard, ShieldCheck, Clock, CheckCircle2, Info, PhoneCall, Star } from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+94 77 123 4567",
    pickup: "Bandaranaike International Airport (CMB)",
    destination: "Enter hotel name or city",
    date: "",
    time: "",
    vehicleType: "Standard Sedan",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking request received! Our team will contact you shortly.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <MarketingHeader />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Book Your Journey</h1>
          <p className="text-slate-600 text-sm">Reliable airport transfers and island-wide tours at your fingertips.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Passenger Info */}
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
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Phone Number (WhatsApp Preferred)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Trip Details */}
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
                        value={formData.pickup}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] appearance-none"
                      >
                        <option>Bandaranaike International Airport (CMB)</option>
                        <option>Colombo City Center</option>
                        <option>Negombo Hotels</option>
                      </select>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                        <Info className="w-3.5 h-3.5" />
                        Flight tracking included for airport pickups
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Destination Address</label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] text-slate-400"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">Preferred Time</label>
                        <div className="relative">
                          <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Choose Ride */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                    <Car className="w-5 h-5 text-[#1e90ff]" />
                    Choose Your Ride
                  </div>
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, vehicleType: "Standard Sedan"})}
                      className={`w-full flex items-center justify-between p-5 border rounded-2xl transition-all ${
                        formData.vehicleType === "Standard Sedan" 
                          ? 'border-[#1e90ff] bg-blue-50/50 ring-1 ring-[#1e90ff]' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xl">🚗</div>
                        <div className="text-left">
                          <div className="font-bold text-sm text-slate-900">Standard Sedan</div>
                          <div className="text-xs text-slate-500 mt-0.5">Toyota Prius / Honda Grace • 3-4 Seats</div>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-[#1e90ff]">
                        {formData.vehicleType === "Standard Sedan" && <div className="w-2.5 h-2.5 bg-[#1e90ff] rounded-full" />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({...formData, vehicleType: "Luxury Van"})}
                      className={`w-full flex items-center justify-between p-5 border rounded-2xl transition-all ${
                        formData.vehicleType === "Luxury Van" 
                          ? 'border-[#1e90ff] bg-blue-50/50 ring-1 ring-[#1e90ff]' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xl">🚐</div>
                        <div className="text-left">
                          <div className="font-bold text-sm text-slate-900">Luxury Van</div>
                          <div className="text-xs text-slate-500 mt-0.5">Toyota KDH / Commuter • 6-10 Seats</div>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-slate-300">
                        {formData.vehicleType === "Luxury Van" && <div className="w-2.5 h-2.5 bg-[#1e90ff] rounded-full" />}
                      </div>
                    </button>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">PAY THE DRIVER</div>
                      <div className="text-xl font-bold text-slate-900">Estimate: $45 - $60</div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#1e90ff] hover:bg-blue-600 transition-colors text-white px-10 py-4 rounded-xl text-sm font-bold shadow-sm"
                  >
                    Submit Booking &gt;
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Guarantee Box */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-[#1e90ff] px-6 py-4 flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                LankaRide Guarantee
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 mb-1">24/7 Availability</div>
                    <div className="text-xs text-slate-500 leading-relaxed">Whether your flight lands at 3 AM or 3 PM, our drivers are ready for you.</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 mb-1">Door-to-Door Service</div>
                    <div className="text-xs text-slate-500 leading-relaxed">Drop-offs right at your hotel lobby or guesthouse anywhere in the island.</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] flex-shrink-0">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 mb-1">No Hidden Fees</div>
                    <div className="text-xs text-slate-500 leading-relaxed">The estimate you see is the price you pay. Tolls and taxes included.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-[#f4f9ff] rounded-3xl p-6 border border-blue-50 text-center">
              <div className="text-sm font-medium text-slate-600 mb-1">Need immediate help?</div>
              <div className="font-bold text-slate-900 mb-4">Contact Support</div>
              <a 
                href="tel:+94771234567"
                className="flex items-center justify-center gap-2 w-full bg-[#1e90ff] hover:bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold transition-colors mb-3"
              >
                <PhoneCall className="w-4 h-4" />
                +94 77 123 4567
              </a>
              <div className="text-[10px] text-slate-400 font-medium">Average response time: 2 mins</div>
            </div>

            {/* Mini Testimonial */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <div className="flex text-amber-400 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                "Our driver Priyantha was amazing! Waiting for us at the airport with a name board even though our flight was delayed by 2 hours. Highly recommended."
              </p>
              <div className="flex items-center gap-3">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-xs text-slate-900">Sarah Jenkins</div>
                  <div className="text-[10px] text-slate-500">United Kingdom</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
