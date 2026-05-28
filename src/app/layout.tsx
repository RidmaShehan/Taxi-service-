import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PublicAnalytics } from "@/components/analytics/public-analytics";
import { getSiteSettings } from "@/lib/actions/site-settings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const keywords = s.meta_keywords
    ?.split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    title: s.meta_title,
    description: s.site_description,
    icons: s.favicon_url
      ? { icon: [{ url: s.favicon_url }], apple: [{ url: s.favicon_url }] }
      : undefined,
    keywords: keywords?.length ? keywords : undefined,
    robots: s.meta_robots ?? "index, follow",
    ...(s.canonical_url ? { alternates: { canonical: s.canonical_url } } : {}),
    openGraph: {
      title: s.og_title ?? s.meta_title,
      description: s.og_description ?? s.site_description,
      siteName: s.site_name,
      type: "website",
      ...(s.og_image_url ? { images: [{ url: s.og_image_url }] } : {}),
    },
    twitter: {
      card: s.og_image_url ? "summary_large_image" : "summary",
      title: s.og_title ?? s.meta_title,
      description: s.og_description ?? s.site_description,
      ...(s.og_image_url ? { images: [s.og_image_url] } : {}),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-50 antialiased`}
      >
        <PublicAnalytics />
        {children}
      </body>
    </html>
  );
}
