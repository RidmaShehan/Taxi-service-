"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Car, Star, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/fleet", label: "Fleet", icon: Car },
    { href: "/admin/reviews", label: "Reviews", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white h-16 px-4 border-b border-slate-100 fixed top-0 left-0 right-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e90ff] text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M3.375 12h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              <path d="M4.5 12v4.5c0 .828.672 1.5 1.5 1.5h1.5c.828 0 1.5-.672 1.5-1.5V12h9v4.5c0 .828.672 1.5 1.5 1.5h1.5c.828 0 1.5-.672 1.5-1.5V12" />
              <path d="M6 7.5h12A1.5 1.5 0 0016.5 6h-9A1.5 1.5 0 006 7.5z" />
            </svg>
          </div>
          <div className="font-bold text-lg tracking-tight text-[#1e90ff]">
            LankaRide
          </div>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-slate-600 p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col h-full
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:flex-shrink-0
      `}>
        <div className="h-16 md:h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e90ff] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.375 12h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                <path d="M4.5 12v4.5c0 .828.672 1.5 1.5 1.5h1.5c.828 0 1.5-.672 1.5-1.5V12h9v4.5c0 .828.672 1.5 1.5 1.5h1.5c.828 0 1.5-.672 1.5-1.5V12" />
                <path d="M6 7.5h12A1.5 1.5 0 0016.5 6h-9A1.5 1.5 0 006 7.5z" />
              </svg>
            </div>
            <div className="font-bold text-xl tracking-tight text-[#1e90ff]">
              LankaRide
            </div>
          </Link>
          <button 
            className="md:hidden text-slate-500 p-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-400 mb-4 px-2 tracking-wider uppercase">
            MANAGEMENT
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    isActive
                      ? "bg-[#f4f9ff] text-[#1e90ff]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" /> {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-3 px-2 mb-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="text-sm font-bold text-slate-900">LankaRide Admin</div>
              <div className="text-xs text-slate-500">admin@lankaride.lk</div>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm w-full transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:w-auto pt-16 md:pt-0 p-4 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
