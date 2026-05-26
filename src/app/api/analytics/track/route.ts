import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getClientIp, lookupGeoFromIp } from "@/lib/geoip";
import { parseUserAgent } from "@/lib/parse-user-agent";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
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

    if (!body.consent) {
      return NextResponse.json({ ok: false, reason: "no_consent" }, { status: 400 });
    }

    if (!body.session_id || !body.page_path) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ip = getClientIp(request.headers);
    const ua = request.headers.get("user-agent");
    const parsed = parseUserAgent(ua);
    const geo = await lookupGeoFromIp(ip);

    const supabase = await createServiceClient();
    const { error } = await supabase.from("visitor_events").insert({
      session_id: body.session_id.slice(0, 64),
      page_path: body.page_path.slice(0, 500),
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
      console.error("visitor_events insert:", error.message);
      return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
