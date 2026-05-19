import { categoryMeta, type Category } from "@/data/mock";

const toneStyles: Record<string, { bg: string; fg: string; border: string }> = {
  primary: { bg: "color-mix(in oklab, var(--color-primary) 12%, white)", fg: "var(--color-primary-dark)", border: "color-mix(in oklab, var(--color-primary) 25%, white)" },
  coral:   { bg: "var(--color-coral-soft)",   fg: "var(--color-coral)",  border: "color-mix(in oklab, var(--color-coral) 25%, white)" },
  mint:    { bg: "var(--color-mint-soft)",    fg: "oklch(0.45 0.1 165)", border: "color-mix(in oklab, var(--color-mint) 30%, white)" },
  yellow:  { bg: "var(--color-yellow-soft)",  fg: "oklch(0.45 0.11 75)", border: "color-mix(in oklab, var(--color-yellow) 35%, white)" },
  muted:   { bg: "oklch(0.96 0.005 250)",     fg: "var(--color-muted-foreground)", border: "var(--color-border)" },
};

export function CategoryBadge({ category, size = "sm" }: { category: Category; size?: "sm" | "xs" }) {
  const meta = categoryMeta[category];
  const t = toneStyles[meta.tone];
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"}`}
      style={{ background: t.bg, color: t.fg, border: `1px solid ${t.border}` }}
    >
      {meta.label}
    </span>
  );
}

export function PlainBadge({ children, tone = "muted" }: { children: React.ReactNode; tone?: keyof typeof toneStyles }) {
  const t = toneStyles[tone];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ background: t.bg, color: t.fg, border: `1px solid ${t.border}` }}
    >
      {children}
    </span>
  );
}
