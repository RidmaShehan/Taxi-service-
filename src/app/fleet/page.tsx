"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, UserCheck, Users, Luggage, Snowflake, Info } from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";

const vehicles = [
  {
    name: "Toyota Prius Hybrid",
    description: "Perfect for solo travelers or couples. Fuel efficient, and smooth for city rides.",
    category: "Sedan",
    price: "$35",
    seats: 4,
    luggage: 2,
    ac: true,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800",
  },
  {
    name: "Mercedes-Benz E-Class",
    description: "Arrival in style. Premium leather interiors and climate control for maximum comfort.",
    category: "Premium",
    price: "$75",
    seats: 3,
    luggage: 2,
    ac: true,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800",
  },
  {
    name: "Toyota KDH Hiace",
    description: "Best choice for large families or tour groups. High roof with ample luggage space.",
    category: "Van",
    price: "$90",
    seats: 12,
    luggage: 10,
    ac: true,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
  },
  {
    name: "Nissan X-Trail SUV",
    description: "Handle the hill country with ease. High ground clearance for off-road adventures.",
    category: "SUV",
    price: "$55",
    seats: 5,
    luggage: 4,
    ac: true,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
  },
  {
    name: "Honda Vezel Hybrid",
    description: "Compact SUV comfort with the fuel efficiency of a hybrid. Great for airport luggage.",
    category: "SUV",
    price: "$45",
    seats: 4,
    luggage: 3,
    ac: true,
    image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800",
  },
  {
    name: "Toyota Axio",
    description: "Reliable and affordable transport. Our most popular budget-friendly option.",
    category: "Sedan",
    price: "$30",
    seats: 4,
    luggage: 2,
    ac: true,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800",
  },
];

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <MarketingHeader />
      
      <main className="pb-24">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <div className="text-[#1e90ff] text-xs font-bold tracking-widest uppercase mb-4">Premium Fleet</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Our Fleet
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover our wide range of vehicles meticulously maintained to ensure your comfort and safety across the beautiful landscapes of Sri Lanka.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#f4f9ff] rounded-2xl p-6 flex items-start gap-4 border border-blue-50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1e90ff] shadow-sm flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Safety First</h3>
                <p className="text-sm text-slate-600">All vehicles undergo 50+ point safety inspections weekly.</p>
              </div>
            </div>
            <div className="bg-[#f4f9ff] rounded-2xl p-6 flex items-start gap-4 border border-blue-50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1e90ff] shadow-sm flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Regular Cleaning</h3>
                <p className="text-sm text-slate-600">Deep sanitized interiors before every single pickup.</p>
              </div>
            </div>
            <div className="bg-[#f4f9ff] rounded-2xl p-6 flex items-start gap-4 border border-blue-50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1e90ff] shadow-sm flex-shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">English Drivers</h3>
                <p className="text-sm text-slate-600">Experienced chauffeurs with excellent English communication.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12">
          {["All", "Sedan", "SUV", "Van", "Premium"].map((filter) => (
            <button
              key={filter}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === "All" 
                  ? "bg-[#1e90ff] text-white" 
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Available Vehicles <span className="text-[#1e90ff]">(6)</span></h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Info className="w-4 h-4" />
              All prices include driver and insurance
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {vehicles.map((vehicle, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col">
                <div className="relative h-56 bg-slate-100">
                  <div className="absolute top-4 left-4 bg-[#1e90ff] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                    {vehicle.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg z-10 flex flex-col items-end">
                    <span className="text-[10px] text-slate-300 font-normal">Starting from</span>
                    {vehicle.price}
                  </div>
                  <Image 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    fill
                    className="object-cover mix-blend-multiply"
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{vehicle.name}</h3>
                  <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">
                    {vehicle.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6 border-t border-b border-slate-100 py-4">
                    <div className="flex flex-col items-center justify-center gap-1 text-slate-600">
                      <Users className="w-5 h-5 text-[#1e90ff]" />
                      <span className="text-xs font-medium">{vehicle.seats} Seats</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 text-slate-600 border-l border-r border-slate-100">
                      <Luggage className="w-5 h-5 text-[#1e90ff]" />
                      <span className="text-xs font-medium">{vehicle.luggage} Bags</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 text-slate-600">
                      <Snowflake className="w-5 h-5 text-[#1e90ff]" />
                      <span className="text-xs font-medium">Full A/C</span>
                    </div>
                  </div>

                  <Link
                    href="/booking"
                    className="block w-full text-center py-3.5 bg-[#1e90ff] hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-colors"
                  >
                    Book This Vehicle &gt;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Package Banner */}
          <div className="bg-[#f4f9ff] rounded-3xl p-10 md:p-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Need a Custom Travel Package?</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                If you are planning a multi-day tour around Sri Lanka or need a vehicle for a corporate event, our team can provide a tailored quote for your specific itinerary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="bg-[#1e90ff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold text-center transition-colors"
                >
                  Contact Our Team
                </Link>
                <Link 
                  href="/reviews"
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-3.5 rounded-xl text-sm font-bold text-center transition-colors"
                >
                  Read Our Reviews
                </Link>
              </div>
            </div>
            <div className="w-full md:w-5/12 h-64 relative rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="https://images.unsplash.com/photo-1586227740560-8cf2732c1531?q=80&w=1000"
                alt="Sri Lanka landscape"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
