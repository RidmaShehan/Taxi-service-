"use client";

import type { MapPoint } from "@/lib/actions/analytics";

type Props = { points: MapPoint[] };

function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x: Math.min(98, Math.max(2, x)), y: Math.min(92, Math.max(8, y)) };
}

export function VisitorWorldMap({ points }: Props) {
  const maxVisits = Math.max(1, ...points.map((p) => p.visits));

  return (
    <div className="relative w-full aspect-[2/1] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200">
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full opacity-30"
        aria-hidden
      >
        <ellipse cx="500" cy="250" rx="480" ry="230" fill="none" stroke="#334155" strokeWidth="1" />
        <path
          d="M120,200 Q200,120 320,180 T500,160 T680,200 T820,240"
          fill="none"
          stroke="#475569"
          strokeWidth="0.8"
        />
        <path
          d="M150,320 Q280,380 450,340 T700,360"
          fill="none"
          stroke="#475569"
          strokeWidth="0.8"
        />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 to-slate-950/60" />

      {points.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
          No location data yet — visits appear after visitors accept analytics cookies.
        </div>
      ) : (
        points.map((point, i) => {
          const { x, y } = project(point.latitude, point.longitude);
          const size = 8 + (point.visits / maxVisits) * 20;
          return (
            <div
              key={`${point.country_code}-${point.city}-${i}`}
              className="absolute group"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              title={`${point.city ? `${point.city}, ` : ""}${point.country} — ${point.visits} visits`}
            >
              <span
                className="block rounded-full bg-[#1e90ff] opacity-80 animate-pulse"
                style={{ width: size, height: size }}
              />
              <span className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block whitespace-nowrap bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-lg z-10">
                {point.country}
                {point.city ? ` · ${point.city}` : ""} ({point.visits})
              </span>
            </div>
          );
        })
      )}

      <div className="absolute bottom-3 left-3 text-[10px] text-slate-400 font-medium">
        Visitor locations (last 30 days)
      </div>
    </div>
  );
}
