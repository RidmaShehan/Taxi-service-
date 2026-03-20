import Link from "next/link";

export function BookingCTA() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 p-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:30px_30px] opacity-30"></div>
      
      <div className="relative">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8">
          <span className="text-4xl">📍</span>
        </div>
        
        <h2 className="text-4xl font-semibold tracking-tight mb-4 text-white">
          Ready to book your ride?
        </h2>
        
        <p className="text-xl text-slate-400 max-w-md mx-auto mb-10">
          Get an instant quote for your airport transfer or private tour.
        </p>

        <Link
          href="/booking"
          className="inline-flex h-14 items-center justify-center px-16 rounded-full bg-white text-slate-950 font-semibold text-lg hover:bg-slate-200 transition-all active:scale-[0.985]"
        >
          Reserve Your Taxi Now
        </Link>
        
        <div className="mt-8 text-xs text-slate-500 flex items-center justify-center gap-6">
          <div>✅ No hidden fees</div>
          <div>✅ Free cancellation</div>
          <div>✅ 24/7 support</div>
        </div>
      </div>
    </div>
  );
}
