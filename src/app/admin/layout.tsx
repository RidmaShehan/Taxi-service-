"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Car,
  Star,
  LogOut,
  Menu,
  X,
  Users,
  Image as ImageIcon,
  Settings,
  BarChart3,
} from "lucide-react";
import { signOut } from "@/lib/actions/auth";
import { MaintenanceToggle } from "@/components/admin/maintenance-toggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/fleet", label: "Fleet", icon: Car },
    { href: "/admin/reviews", label: "Reviews", icon: Star },
    { href: "/admin/manage-drivers", label: "Drivers", icon: Users },
    { href: "/admin/gallery-view", label: "Gallery", icon: ImageIcon },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between bg-white h-16 px-4 border-b border-slate-100 fixed top-0 left-0 right-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e90ff] text-white font-bold text-xs">
            LR
          </div>
          <div className="font-bold text-lg tracking-tight text-[#1e90ff]">LankaRide</div>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-600 p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="h-16 md:h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e90ff] text-white font-bold text-sm">
              LR
            </div>
            <div className="font-bold text-xl tracking-tight text-[#1e90ff]">LankaRide</div>
          </Link>
          <button className="md:hidden text-slate-500 p-1" onClick={() => setIsMobileMenuOpen(false)}>
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
                    isActive ? "bg-[#f4f9ff] text-[#1e90ff]" : "text-slate-600 hover:bg-slate-50"
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
            <div className="w-10 h-10 rounded-full bg-[#1e90ff] text-white flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Admin</div>
              <div className="text-xs text-slate-500">Dashboard</div>
            </div>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm w-full transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 w-full md:w-auto pt-16 md:pt-0 p-4 md:p-8 overflow-x-hidden">
        <div className="flex justify-end mb-4">
          <MaintenanceToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
