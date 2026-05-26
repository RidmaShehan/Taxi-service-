export type GeoLocation = {
  country: string | null;
  country_code: string | null;
  region: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
};

const EMPTY_GEO: GeoLocation = {
  country: null,
  country_code: null,
  region: null,
  city: null,
  latitude: null,
  longitude: null,
};

function isPrivateIp(ip: string): boolean {
  if (ip === "unknown" || ip === "::1" || ip === "127.0.0.1") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.") || ip.startsWith("172.")) return true;
  return false;
}

/** Resolve approximate location from IP (ip-api.com free tier, non-commercial). */
export async function lookupGeoFromIp(ip: string): Promise<GeoLocation> {
  if (isPrivateIp(ip)) return EMPTY_GEO;

  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,regionName,city,lat,lon`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return EMPTY_GEO;

    const data = (await res.json()) as {
      status?: string;
      country?: string;
      countryCode?: string;
      regionName?: string;
      city?: string;
      lat?: number;
      lon?: number;
    };

    if (data.status !== "success") return EMPTY_GEO;

    return {
      country: data.country ?? null,
      country_code: data.countryCode ?? null,
      region: data.regionName ?? null,
      city: data.city ?? null,
      latitude: typeof data.lat === "number" ? data.lat : null,
      longitude: typeof data.lon === "number" ? data.lon : null,
    };
  } catch {
    return EMPTY_GEO;
  }
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
