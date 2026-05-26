"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Wrench } from "lucide-react";
import {
  getMaintenanceStatus,
  toggleMaintenanceMode,
} from "@/lib/actions/maintenance";

export function MaintenanceToggle() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    getMaintenanceStatus().then((s) => {
      setEnabled(s.enabled);
      setLoading(false);
    });
  }, []);

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleMaintenanceMode();
      if ("enabled" in result && result.enabled !== undefined) {
        setEnabled(result.enabled);
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading || pending}
      title={enabled ? "Turn off maintenance mode" : "Enable maintenance mode"}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors border ${
        enabled
          ? "bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200"
          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
      } disabled:opacity-50`}
    >
      <Wrench className="w-4 h-4" />
      {pending ? "Updating…" : enabled ? "Maintenance ON" : "Maintenance OFF"}
    </button>
  );
}
