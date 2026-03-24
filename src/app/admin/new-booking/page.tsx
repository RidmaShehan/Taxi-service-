"use client";

import Link from "next/link";
import { Users, Car, DollarSign, Star, MoreVertical, Upload, Check, X, Plus, Calendar, Image as ImageIcon, Clock } from "lucide-react";

export default function NewBookingPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">New Booking</h1>
          <p className="text-slate-500 text-sm">Manually create bookings for phone and WhatsApp customers.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
            Download Report
          </button>
          <button className="flex-1 md:flex-none px-5 py-2.5 bg-[#1e90ff] text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff]">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900">+12.5%</span>
          </div>
          <div className="text-sm text-slate-500 font-medium mb-1">Total Bookings</div>
          <div className="text-2xl font-bold text-slate-900">1,284</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff]">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900">95% util.</span>
          </div>
          <div className="text-sm text-slate-500 font-medium mb-1">Active Fleet</div>
          <div className="text-2xl font-bold text-slate-900">18</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff]">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900">+8.2%</span>
          </div>
          <div className="text-sm text-slate-500 font-medium mb-1">Monthly Revenue</div>
          <div className="text-2xl font-bold text-slate-900">$14,580</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff]">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900">Excellent</span>
          </div>
          <div className="text-sm text-slate-500 font-medium mb-1">Avg. Rating</div>
          <div className="text-2xl font-bold text-slate-900">4.9 / 5</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Recent Airport Transfers */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Recent Airport Transfers</h2>
                <p className="text-xs text-slate-500 mt-1">View and manage your latest pickup requests.</p>
              </div>
              <button className="text-sm font-semibold text-[#1e90ff] hover:underline whitespace-nowrap ml-4">View All &gt;</button>
            </div>

            <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
              <table className="w-full min-w-[600px] text-sm text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Route</th>
                  <th className="pb-3 font-medium">Date & Time</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="py-4">
                    <div className="font-bold text-slate-900">James Miller</div>
                    <div className="text-xs text-slate-500">BK-1024</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] text-[10px]">✈</div>
                      CMB Airport &gt; Galle Fort
                    </div>
                  </td>
                  <td className="py-4 text-slate-600 font-medium">
                    <div>2023-11-25</div>
                    <div className="text-xs text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 14:30
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase tracking-wider">Confirmed</span>
                  </td>
                  <td className="py-4 text-slate-400"><MoreVertical className="w-4 h-4 cursor-pointer hover:text-slate-600" /></td>
                </tr>
                <tr>
                  <td className="py-4">
                    <div className="font-bold text-slate-900">Sophie Chen</div>
                    <div className="text-xs text-slate-500">BK-1025</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] text-[10px]">✈</div>
                      Negombo &gt; Sigiriya
                    </div>
                  </td>
                  <td className="py-4 text-slate-600 font-medium">
                    <div>2023-11-26</div>
                    <div className="text-xs text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 09:00
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">Pending</span>
                  </td>
                  <td className="py-4 text-slate-400"><MoreVertical className="w-4 h-4 cursor-pointer hover:text-slate-600" /></td>
                </tr>
                <tr>
                  <td className="py-4">
                    <div className="font-bold text-slate-900">Robert Wilson</div>
                    <div className="text-xs text-slate-500">BK-1026</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] text-[10px]">✈</div>
                      CMB Airport &gt; Colombo 07
                    </div>
                  </td>
                  <td className="py-4 text-slate-600 font-medium">
                    <div>2023-11-26</div>
                    <div className="text-xs text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 23:15
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase tracking-wider">Confirmed</span>
                  </td>
                  <td className="py-4 text-slate-400"><MoreVertical className="w-4 h-4 cursor-pointer hover:text-slate-600" /></td>
                </tr>
                <tr>
                  <td className="py-4">
                    <div className="font-bold text-slate-900">Elena Rodriguez</div>
                    <div className="text-xs text-slate-500">BK-1027</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] text-[10px]">✈</div>
                      Kandy City &gt; Ella Station
                    </div>
                  </td>
                  <td className="py-4 text-slate-600 font-medium">
                    <div>2023-11-27</div>
                    <div className="text-xs text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 11:45
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase tracking-wider">Confirmed</span>
                  </td>
                  <td className="py-4 text-slate-400"><MoreVertical className="w-4 h-4 cursor-pointer hover:text-slate-600" /></td>
                </tr>
                <tr>
                  <td className="py-4">
                    <div className="font-bold text-slate-900">David Thompson</div>
                    <div className="text-xs text-slate-500">BK-1028</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] text-[10px]">✈</div>
                      CMB Airport &gt; Mirissa Beach
                    </div>
                  </td>
                  <td className="py-4 text-slate-600 font-medium">
                    <div>2023-11-28</div>
                    <div className="text-xs text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 08:00
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">Pending</span>
                  </td>
                  <td className="py-4 text-slate-400"><MoreVertical className="w-4 h-4 cursor-pointer hover:text-slate-600" /></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          {/* Fleet Management */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Fleet Management</h2>
            <p className="text-xs text-slate-500 mb-6">Manage vehicle photos and specifications shown in the gallery.</p>
            
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 md:p-10 text-center mb-6 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1e90ff] flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <div className="font-bold text-slate-900 text-sm mb-1">Click or drag to upload vehicle images</div>
              <div className="text-xs text-slate-400">High-quality JPG or PNG (Max 5MB)</div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">ACTIVE VEHICLE GALLERY</div>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden relative border border-slate-200 group">
                  <img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=400" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <X className="w-5 h-5 text-white cursor-pointer" />
                  </div>
                </div>
                <div className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden relative border border-slate-200 group">
                  <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <X className="w-5 h-5 text-white cursor-pointer" />
                  </div>
                </div>
                <div className="w-40 h-24 flex-shrink-0 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Review Moderation */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-slate-900">Review Moderation</h2>
              <span className="bg-blue-50 text-[#1e90ff] text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
            </div>
            <p className="text-xs text-slate-500 mb-6">Approve or decline customer testimonials before they go public.</p>

            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Alex Thompson</div>
                      <div className="flex text-amber-400 mt-0.5"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                    </div>
                  </div>
                  <div className="text-[10px] font-medium text-slate-400">2 hours ago</div>
                </div>
                <p className="text-xs text-slate-600 italic mb-4 leading-relaxed">"Fantastic service! The driver was waiting for us at the airport with a clear sign. Highly recommend for any traveler in Sri Lanka."</p>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Approve
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-red-100 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors">
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                </div>
              </div>

              <div className="border-b border-slate-100 pb-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Maria Garcia</div>
                      <div className="flex text-amber-400 mt-0.5"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                    </div>
                  </div>
                  <div className="text-[10px] font-medium text-slate-400">1 day ago</div>
                </div>
                <p className="text-xs text-slate-600 italic mb-4 leading-relaxed">"Comfortable car and very professional. A bit late due to traffic but the driver kept us informed. Overall great."</p>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Approve
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-red-100 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors">
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                </div>
              </div>
              
              <button className="w-full text-center text-xs font-semibold text-[#1e90ff] hover:underline">View moderation history</button>
            </div>
          </div>

          {/* Add Testimonial */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Add Testimonial</h2>
            <p className="text-xs text-slate-500 mb-6">Manually add reviews collected offline.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">CUSTOMER NAME</label>
                <input type="text" placeholder="Enter customer name" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">REVIEW CONTENT</label>
                <textarea placeholder="Type the customer's feedback here..." rows={3} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] resize-none"></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">RATING</label>
                <div className="flex gap-1 text-slate-200">
                  <Star className="w-5 h-5 cursor-pointer hover:text-amber-400 hover:fill-current" />
                  <Star className="w-5 h-5 cursor-pointer hover:text-amber-400 hover:fill-current" />
                  <Star className="w-5 h-5 cursor-pointer hover:text-amber-400 hover:fill-current" />
                  <Star className="w-5 h-5 cursor-pointer hover:text-amber-400 hover:fill-current" />
                  <Star className="w-5 h-5 cursor-pointer hover:text-amber-400 hover:fill-current" />
                </div>
              </div>
              <button className="w-full bg-[#1e90ff] hover:bg-blue-600 transition-colors text-white py-3 rounded-lg text-sm font-bold mt-2">
                Save Testimonial
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#f4f9ff] rounded-2xl border border-blue-50 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/add-vehicle" className="bg-white p-3.5 rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-2 text-xs font-semibold text-slate-700 hover:border-[#1e90ff] hover:text-[#1e90ff] transition-all shadow-sm">
                <Car className="w-5 h-5 text-[#1e90ff]" /> Add Vehicle
              </Link>
              <Link href="/admin/new-booking" className="bg-white p-3.5 rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-2 text-xs font-semibold text-slate-700 hover:border-[#1e90ff] hover:text-[#1e90ff] transition-all shadow-sm">
                <Calendar className="w-5 h-5 text-[#1e90ff]" /> New Booking
              </Link>
              <Link href="/admin/manage-drivers" className="bg-white p-3.5 rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-2 text-xs font-semibold text-slate-700 hover:border-[#1e90ff] hover:text-[#1e90ff] transition-all shadow-sm">
                <Users className="w-5 h-5 text-[#1e90ff]" /> Manage Drivers
              </Link>
              <Link href="/admin/gallery-view" className="bg-white p-3.5 rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-2 text-xs font-semibold text-slate-700 hover:border-[#1e90ff] hover:text-[#1e90ff] transition-all shadow-sm">
                <ImageIcon className="w-5 h-5 text-[#1e90ff]" /> Gallery View
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium text-slate-500 border-t border-slate-200 pt-6 pb-8">
        <div>© 2023 LankaRide Management System v2.4.0</div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="#" className="hover:text-slate-900">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900">Terms of Service</a>
          <span>System Status: <span className="text-emerald-500 font-bold">Online</span></span>
        </div>
      </div>
    </div>
  );
}
