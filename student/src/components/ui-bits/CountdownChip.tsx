import { Clock } from "lucide-react";

export function CountdownChip({ days, tone = "coral" }: { days: number; tone?: "coral" | "yellow" | "primary" }) {
  const palette = {
    coral:   { bg: "var(--color-coral-soft)",  fg: "var(--color-coral)",       border: "color-mix(in oklab, var(--color-coral) 25%, white)" },
    yellow:  { bg: "var(--color-yellow-soft)", fg: "oklch(0.45 0.11 75)",      border: "color-mix(in oklab, var(--color-yellow) 35%, white)" },
    primary: { bg: "color-mix(in oklab, var(--color-primary) 12%, white)", fg: "var(--color-primary-dark)", border: "color-mix(in oklab, var(--color-primary) 25%, white)" },
  }[tone];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ background: palette.bg, color: palette.fg, border: `1px solid ${palette.border}` }}
    >
      <Clock className="h-3 w-3" />
      {days} {days === 1 ? "day" : "days"} left
    </span>
  );
}
