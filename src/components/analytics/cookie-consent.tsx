"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "lr_analytics_consent";

export type ConsentStatus = "pending" | "accepted" | "essential";

export function getAnalyticsConsent(): ConsentStatus {
  if (typeof window === "undefined") return "pending";
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "accepted") return "accepted";
  if (v === "essential") return "essential";
  return "pending";
}

export function setAnalyticsConsent(status: "accepted" | "essential") {
  localStorage.setItem(CONSENT_KEY, status);
  window.dispatchEvent(new CustomEvent("lr-consent-change", { detail: status }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getAnalyticsConsent() === "pending") {
      setTimeout(() => setVisible(true), 0);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-2xl text-slate-900">
        <h2 id="cookie-title" className="text-base font-bold text-slate-900 mb-2">
          Cookies &amp; your privacy
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          We use essential cookies to run this website. With your permission, we also collect
          anonymous visit information (pages viewed, approximate location, device and browser type,
          and IP address) to improve our service. This processing is carried out in line with
          Sri Lanka&apos;s Personal Data Protection Act (No. 9 of 2022). You may accept analytics
          cookies or continue with essential cookies only. Read our{" "}
          <Link href="/contact" className="text-[#1e90ff] font-semibold hover:underline">
            contact page
          </Link>{" "}
          to exercise your data rights.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              setAnalyticsConsent("accepted");
              setVisible(false);
            }}
            className="flex-1 bg-[#1e90ff] hover:bg-blue-600 text-white py-3 rounded-xl text-sm font-bold transition-colors"
          >
            Accept analytics cookies
          </button>
          <button
            type="button"
            onClick={() => {
              setAnalyticsConsent("essential");
              setVisible(false);
            }}
            className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl text-sm font-bold transition-colors"
          >
            Essential cookies only
          </button>
        </div>
      </div>
    </div>
  );
}
