"use client";

import { usePathname } from "next/navigation";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { VisitorTracker } from "@/components/analytics/visitor-tracker";

/** Cookie banner + tracking on public pages only (not admin/login). */
export function PublicAnalytics() {
  const pathname = usePathname() ?? "";

  if (
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname.startsWith("/api")
  ) {
    return null;
  }

  return (
    <>
      <CookieConsent />
      <VisitorTracker />
    </>
  );
}
