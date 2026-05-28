"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getAnalyticsConsent } from "@/components/analytics/cookie-consent";

const SESSION_KEY = "lr_session_id";

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function trackPageView(pathname: string, retry = 0): Promise<void> {
  if (getAnalyticsConsent() !== "accepted") return;

  const sessionId = getOrCreateSessionId();

  try {
    const res = await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        page_path: pathname,
        page_title: typeof document !== "undefined" ? document.title : "",
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
        screen_width: typeof window !== "undefined" ? window.screen.width : null,
        screen_height: typeof window !== "undefined" ? window.screen.height : null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: typeof navigator !== "undefined" ? navigator.language : null,
        consent: true,
      }),
      keepalive: true,
    });

    if (!res.ok && retry < 2) {
      await new Promise((r) => setTimeout(r, 800));
      return trackPageView(pathname, retry + 1);
    }

    if (!res.ok && process.env.NODE_ENV === "development") {
      const data = (await res.json().catch(() => ({}))) as { detail?: string; error?: string };
      console.warn("[analytics]", data.detail ?? data.error ?? res.status);
    }
  } catch (err) {
    if (retry < 2) {
      await new Promise((r) => setTimeout(r, 800));
      return trackPageView(pathname, retry + 1);
    }
    if (process.env.NODE_ENV === "development") {
      console.warn("[analytics] track failed", err);
    }
  }
}

export function VisitorTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const onConsent = () => {
      if (getAnalyticsConsent() === "accepted" && pathname) {
        void trackPageView(pathname);
      }
    };
    window.addEventListener("lr-consent-change", onConsent);
    return () => window.removeEventListener("lr-consent-change", onConsent);
  }, [pathname]);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;
    void trackPageView(pathname);
  }, [pathname]);

  return null;
}
