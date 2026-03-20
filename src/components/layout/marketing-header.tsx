"use client";

import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { marketingNav } from "@/config/navigation";

export function MarketingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-[#1e90ff] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+94771234567"
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-[#1e90ff] px-4 py-2 rounded-full border border-slate-200"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            
            <Link
              href="/booking"
              className="bg-[#1e90ff] hover:bg-blue-600 transition-colors text-white px-6 py-2.5 rounded-full text-sm font-medium"
            >
              Book a Ride
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-600"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-6 bg-white">
            <nav className="flex flex-col gap-y-6 text-lg">
              {marketingNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-600 hover:text-[#1e90ff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="bg-[#1e90ff] text-white py-4 text-center rounded-full font-medium mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Ride
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
