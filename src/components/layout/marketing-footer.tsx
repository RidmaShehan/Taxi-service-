import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
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
            
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              Premium private transport services across Sri Lanka. Reliable, safe, and professional drivers for all your travel needs.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1e90ff] hover:bg-blue-50 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1e90ff] hover:bg-blue-50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1e90ff] hover:bg-blue-50 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <div className="font-bold text-slate-900 mb-6 text-sm">Quick Links</div>
            <div className="space-y-4 text-sm">
              <Link href="/" className="block text-slate-500 hover:text-[#1e90ff]">Home</Link>
              <Link href="/fleet" className="block text-slate-500 hover:text-[#1e90ff]">Our Fleet</Link>
              <Link href="/reviews" className="block text-slate-500 hover:text-[#1e90ff]">Reviews</Link>
              <Link href="/contact" className="block text-slate-500 hover:text-[#1e90ff]">Contact</Link>
              <Link href="/admin" className="block text-slate-500 hover:text-[#1e90ff]">Admin Login</Link>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <div className="font-bold text-slate-900 mb-6 text-sm">Services</div>
            <div className="space-y-4 text-sm">
              <div className="text-slate-500">Airport Transfers</div>
              <div className="text-slate-500">Sightseeing Tours</div>
              <div className="text-slate-500">Corporate Travel</div>
              <div className="text-slate-500">Intercity Rides</div>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="font-bold text-slate-900 mb-6 text-sm">Contact Us</div>
            
            <div className="space-y-4 text-sm mb-8">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-slate-500 hover:text-[#1e90ff]">
                📞 {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-slate-500 hover:text-[#1e90ff]">
                ✉️ {siteConfig.email}
              </a>
              <div className="flex items-center gap-3 text-slate-500">
                📍 Colombo, Sri Lanka
              </div>
            </div>

            <a 
              href={`https://wa.me/${siteConfig.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-50 text-slate-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors w-full"
            >
              <span className="text-[#25D366] text-lg">💬</span> WhatsApp Chat
            </a>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} LankaRide. All rights reserved. Designed for Sri Lankan Excellence.
        </div>
      </div>
    </footer>
  );
}
