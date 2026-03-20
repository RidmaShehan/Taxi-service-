"use client";

import { MapPin, Calendar, Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10 mb-16">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex flex-col md:flex-row items-center gap-4">
        
        <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
          <MapPin className="w-5 h-5 text-slate-400" />
          <div className="flex-1">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">PICKUP LOCATION</div>
            <input 
              type="text" 
              placeholder="Airport or Hotel Name" 
              className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
          <MapPin className="w-5 h-5 text-slate-400" />
          <div className="flex-1">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">DESTINATION</div>
            <input 
              type="text" 
              placeholder="Where are you going?" 
              className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
          <Calendar className="w-5 h-5 text-slate-400" />
          <div className="flex-1">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">TRAVEL DATE</div>
            <input 
              type="text" 
              placeholder="Select Date" 
              className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <button className="w-full md:w-auto bg-[#1e90ff] hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
          <Search className="w-4 h-4" />
          Find My Ride
        </button>

      </div>
    </div>
  );
}
