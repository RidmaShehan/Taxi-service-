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

/** Resolve approximate location from IP (HTTPS, 3s timeout). */
export async function lookupGeoFromIp(ip: string): Promise<GeoLocation> {
  if (isPrivateIp(ip)) return EMPTY_GEO;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!res.ok) return EMPTY_GEO;

    const data = (await res.json()) as {
      success?: boolean;
      country?: string;
      country_code?: string;
      region?: string;
      city?: string;
      latitude?: number;
      longitude?: number;
    };

    if (!data.success) return EMPTY_GEO;

    return {
      country: data.country ?? null,
      country_code: data.country_code ?? null,
      region: data.region ?? null,
      city: data.city ?? null,
      latitude: typeof data.latitude === "number" ? data.latitude : null,
      longitude: typeof data.longitude === "number" ? data.longitude : null,
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
