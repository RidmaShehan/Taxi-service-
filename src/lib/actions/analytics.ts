"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/require-admin";

export type VisitorEvent = {
  id: string;
  session_id: string;
  page_path: string;
  page_title: string | null;
  referrer: string | null;
  ip_address: string | null;
  country: string | null;
  country_code: string | null;
  region: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  device_type: string | null;
  device_os: string | null;
  browser: string | null;
  user_agent: string | null;
  screen_width: number | null;
  screen_height: number | null;
  timezone: string | null;
  language: string | null;
  consent_given: boolean;
  created_at: string;
};

export type MapPoint = {
  country: string;
  country_code: string;
  city: string | null;
  latitude: number;
  longitude: number;
  visits: number;
};

export type AnalyticsSummary = {
  totalPageViews: number;
  uniqueSessions: number;
  uniqueCountries: number;
  topPages: { path: string; count: number }[];
  topCountries: { country: string; code: string; count: number }[];
  deviceBreakdown: { label: string; count: number }[];
  browserBreakdown: { label: string; count: number }[];
  mapPoints: MapPoint[];
  recentEvents: VisitorEvent[];
};

export async function getVisitorAnalytics(): Promise<AnalyticsSummary | { error: string }> {
  const auth = await requireAdmin();
  if (auth.error || !auth.supabase) return { error: auth.error ?? "Unauthorized" };

  const supabase = auth.supabase;
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data: events, error } = await supabase
    .from("visitor_events")
    .select("*")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) return { error: error.message };

  const rows = (events ?? []) as VisitorEvent[];
  const sessions = new Set(rows.map((r) => r.session_id));
  const countries = new Set(rows.map((r) => r.country_code).filter(Boolean));

  const pageCounts = new Map<string, number>();
  const countryCounts = new Map<string, { country: string; code: string; count: number }>();
  const deviceCounts = new Map<string, number>();
  const browserCounts = new Map<string, number>();
  const mapAgg = new Map<string, MapPoint>();

  for (const row of rows) {
    pageCounts.set(row.page_path, (pageCounts.get(row.page_path) ?? 0) + 1);

    if (row.country_code && row.country) {
      const key = row.country_code;
      const existing = countryCounts.get(key);
      if (existing) existing.count += 1;
      else
        countryCounts.set(key, {
          country: row.country,
          code: row.country_code,
          count: 1,
        });
    }

    const device = row.device_type ?? "unknown";
    deviceCounts.set(device, (deviceCounts.get(device) ?? 0) + 1);
    const browser = row.browser ?? "unknown";
    browserCounts.set(browser, (browserCounts.get(browser) ?? 0) + 1);

    if (
      row.latitude != null &&
      row.longitude != null &&
      row.country_code &&
      row.country
    ) {
      const mKey = `${row.country_code}-${row.city ?? "unknown"}`;
      const existing = mapAgg.get(mKey);
      if (existing) existing.visits += 1;
      else
        mapAgg.set(mKey, {
          country: row.country,
          country_code: row.country_code,
          city: row.city,
          latitude: row.latitude,
          longitude: row.longitude,
          visits: 1,
        });
    }
  }

  const sortDesc = (a: { count: number }, b: { count: number }) => b.count - a.count;

  return {
    totalPageViews: rows.length,
    uniqueSessions: sessions.size,
    uniqueCountries: countries.size,
    topPages: [...pageCounts.entries()]
      .map(([path, count]) => ({ path, count }))
      .sort(sortDesc)
      .slice(0, 10),
    topCountries: [...countryCounts.values()].sort(sortDesc).slice(0, 10),
    deviceBreakdown: [...deviceCounts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort(sortDesc),
    browserBreakdown: [...browserCounts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort(sortDesc),
    mapPoints: [...mapAgg.values()].sort((a, b) => b.visits - a.visits),
    recentEvents: rows.slice(0, 100),
  };
}
