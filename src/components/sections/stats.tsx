import type { SiteSettings } from "@/types/site-settings";

type Props = { settings: SiteSettings };

export function Stats({ settings }: Props) {
  const items = [
    { value: settings.stat_1_value, label: settings.stat_1_label },
    { value: settings.stat_2_value, label: settings.stat_2_label },
    { value: settings.stat_3_value, label: settings.stat_3_label },
    { value: settings.stat_4_value, label: settings.stat_4_label },
  ].filter((item) => item.value && item.label);

  if (items.length === 0) return null;

  return (
    <div className="bg-white py-12 border-t border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, i) => (
            <div key={i}>
              <div className="text-4xl font-semibold text-slate-900 mb-1">{item.value}</div>
              <div className="text-slate-500 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
