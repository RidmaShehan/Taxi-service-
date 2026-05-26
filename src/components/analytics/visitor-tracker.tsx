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

function trackPageView(pathname: string) {
  if (getAnalyticsConsent() !== "accepted") return;

  const sessionId = getOrCreateSessionId();

  void fetch("/api/analytics/track", {
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
  }).catch(() => {});
}

export function VisitorTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const onConsent = () => {
      if (getAnalyticsConsent() === "accepted" && pathname) {
        trackPageView(pathname);
      }
    };
    window.addEventListener("lr-consent-change", onConsent);
    return () => window.removeEventListener("lr-consent-change", onConsent);
  }, [pathname]);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
