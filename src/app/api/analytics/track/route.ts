import { NextResponse } from "next/server";
import { createAnalyticsSupabase } from "@/lib/analytics-supabase";
import { getClientIp, lookupGeoFromIp } from "@/lib/geoip";
import { parseUserAgent } from "@/lib/parse-user-agent";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    session_id?: string;
    page_path?: string;
    page_title?: string;
    referrer?: string;
    screen_width?: number;
    screen_height?: number;
    timezone?: string;
    language?: string;
    consent?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.consent) {
    return NextResponse.json({ ok: false, reason: "no_consent" }, { status: 400 });
  }

  if (!body.session_id?.trim() || !body.page_path?.trim()) {
    return NextResponse.json({ error: "Missing session_id or page_path" }, { status: 400 });
  }

  try {
    const ip = getClientIp(request.headers);
    const ua = request.headers.get("user-agent");
    const parsed = parseUserAgent(ua);
    const geo = await lookupGeoFromIp(ip);

    const supabase = createAnalyticsSupabase();
    const { error } = await supabase.from("visitor_events").insert({
      session_id: body.session_id.trim().slice(0, 64),
      page_path: body.page_path.trim().slice(0, 500),
      page_title: body.page_title?.slice(0, 200) ?? null,
      referrer: body.referrer?.slice(0, 500) ?? null,
      ip_address: ip.slice(0, 45),
      country: geo.country,
      country_code: geo.country_code,
      region: geo.region,
      city: geo.city,
      latitude: geo.latitude,
      longitude: geo.longitude,
      device_type: parsed.device_type,
      device_os: parsed.device_os,
      browser: parsed.browser,
      user_agent: ua?.slice(0, 500) ?? null,
      screen_width: body.screen_width ?? null,
      screen_height: body.screen_height ?? null,
      timezone: body.timezone?.slice(0, 80) ?? null,
      language: body.language?.slice(0, 20) ?? null,
      consent_given: true,
    });

    if (error) {
      console.error("[analytics/track]", error.message, error.code);
      return NextResponse.json(
        {
          error: "Failed to save visit",
          detail:
            error.code === "42P01"
              ? "visitor_events table missing — run supabase/migrations/20250525000004_branding_analytics.sql"
              : error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    console.error("[analytics/track]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
