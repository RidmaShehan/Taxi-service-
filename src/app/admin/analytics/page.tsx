import { getVisitorAnalytics } from "@/lib/actions/analytics";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";

export default async function AdminAnalyticsPage() {
  const result = await getVisitorAnalytics();

  if ("error" in result) {
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Visitor analytics</h1>
        <p className="text-red-600 text-sm">{result.error}</p>
        <p className="text-slate-500 text-sm mt-4">
          Run the latest SQL migration in Supabase to create the{" "}
          <code className="bg-slate-100 px-1 rounded">visitor_events</code> table.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Visitor analytics</h1>
      <p className="text-sm text-slate-500 mb-8">
        Page views, locations, devices, and browsers — collected only after cookie consent (Sri
        Lanka PDPA).
      </p>
      <AnalyticsDashboard data={result} />
    </div>
  );
}
