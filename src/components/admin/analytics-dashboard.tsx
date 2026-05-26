"use client";

import type { AnalyticsSummary } from "@/lib/actions/analytics";
import { VisitorWorldMap } from "@/components/admin/visitor-world-map";
import { Globe, Monitor, Users, Eye } from "lucide-react";

type Props = { data: AnalyticsSummary };

export function AnalyticsDashboard({ data }: Props) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Page views (30d)", value: data.totalPageViews, icon: Eye },
          { label: "Unique sessions", value: data.uniqueSessions, icon: Users },
          { label: "Countries", value: data.uniqueCountries, icon: Globe },
          {
            label: "Mobile share",
            value: `${Math.round(
              ((data.deviceBreakdown.find((d) => d.label === "mobile")?.count ?? 0) /
                Math.max(1, data.totalPageViews)) *
                100
            )}%`,
            icon: Monitor,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
            >
              <Icon className="w-5 h-5 text-[#1e90ff] mb-3" />
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <VisitorWorldMap points={data.mapPoints} />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-4">Top pages</h3>
          <ul className="space-y-2 text-sm">
            {data.topPages.length === 0 ? (
              <li className="text-slate-400">No data yet</li>
            ) : (
              data.topPages.map((p) => (
                <li key={p.path} className="flex justify-between gap-4">
                  <span className="text-slate-700 truncate font-mono text-xs">{p.path}</span>
                  <span className="font-bold text-slate-900 shrink-0">{p.count}</span>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-4">Top countries</h3>
          <ul className="space-y-2 text-sm">
            {data.topCountries.length === 0 ? (
              <li className="text-slate-400">No data yet</li>
            ) : (
              data.topCountries.map((c) => (
                <li key={c.code} className="flex justify-between">
                  <span className="text-slate-700">
                    {c.country} ({c.code})
                  </span>
                  <span className="font-bold text-slate-900">{c.count}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Recent visitor activity</h3>
          <p className="text-xs text-slate-500 mt-1">
            Logged when visitors accept analytics cookies (PDPA-compliant consent).
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Page</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">Browser</th>
                <th className="px-4 py-3">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.recentEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No visits recorded yet.
                  </td>
                </tr>
              ) : (
                data.recentEvents.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {new Date(e.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-800">{e.page_path}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {[e.city, e.region, e.country].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {e.device_os} / {e.device_type}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{e.browser ?? "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">
                      {e.ip_address ?? "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
