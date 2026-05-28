import type { AnalyticsSummary } from "@/lib/actions/analytics";

export type AnalyticsResult = AnalyticsSummary | { error: string };

export function isAnalyticsError(result: AnalyticsResult): result is { error: string } {
  return "error" in result;
}
