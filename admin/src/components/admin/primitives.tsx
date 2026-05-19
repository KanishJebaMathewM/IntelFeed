import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl bg-card border border-border", className)}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  right,
  className,
}: {
  title: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between px-6 pt-5 pb-4", className)}>
      <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
      {right}
    </div>
  );
}

type PillTone = "mint" | "coral" | "warn" | "primary" | "muted";

const TONE: Record<PillTone, string> = {
  mint: "bg-mint-soft text-[oklch(0.45_0.13_160)] border-[oklch(0.9_0.06_160)]",
  coral: "bg-coral-soft text-[oklch(0.48_0.14_50)] border-[oklch(0.92_0.06_50)]",
  warn: "bg-warn-soft text-[oklch(0.48_0.14_85)] border-[oklch(0.92_0.08_90)]",
  primary: "bg-[oklch(0.97_0.04_230)] text-[oklch(0.42_0.12_235)] border-[oklch(0.92_0.05_235)]",
  muted: "bg-secondary text-muted-foreground border-border",
};

export function Pill({
  tone = "muted",
  children,
  className,
}: {
  tone?: PillTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PageHeading({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-[14px] text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function Avatar({
  initials,
  size = 32,
  tone = "primary",
}: {
  initials: string;
  size?: number;
  tone?: "primary" | "dark";
}) {
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className={cn(
        "shrink-0 rounded-full flex items-center justify-center font-semibold",
        tone === "primary"
          ? "bg-[oklch(0.94_0.05_230)] text-[oklch(0.42_0.12_235)]"
          : "bg-primary-dark text-white",
      )}
    >
      {initials}
    </div>
  );
}

export function SegmentedBar({
  verified,
  pending,
  disputed,
  total,
}: {
  verified: number;
  pending: number;
  disputed: number;
  total: number;
}) {
  const v = (verified / total) * 100;
  const p = (pending / total) * 100;
  const d = (disputed / total) * 100;
  return (
    <div className="flex h-7 w-full overflow-hidden rounded-full border border-border bg-secondary">
      <div
        className="flex items-center justify-end pr-2 text-[10px] font-semibold text-white"
        style={{ width: `${v}%`, backgroundColor: "oklch(0.78 0.15 160)" }}
      >
        {Math.round(v)}%
      </div>
      <div
        className="flex items-center justify-end pr-2 text-[10px] font-semibold text-white"
        style={{ width: `${p}%`, backgroundColor: "oklch(0.82 0.16 85)" }}
      >
        {p > 6 ? `${Math.round(p)}%` : ""}
      </div>
      <div
        className="flex items-center justify-end pr-2 text-[10px] font-semibold text-white"
        style={{ width: `${d}%`, backgroundColor: "oklch(0.74 0.16 50)" }}
      >
        {d > 6 ? `${Math.round(d)}%` : ""}
      </div>
    </div>
  );
}

export function ScoreBar({ score }: { score: number }) {
  const tone =
    score >= 75
      ? "oklch(0.78 0.15 160)"
      : score >= 50
        ? "oklch(0.82 0.16 85)"
        : "oklch(0.74 0.16 50)";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: tone }} />
      </div>
      <span className="text-[12px] font-semibold tabular-nums text-foreground">{score}</span>
    </div>
  );
}

export function FilterButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="inline-flex items-center gap-2 h-9 rounded-xl border border-border bg-card px-3 text-[13px] text-foreground hover:border-primary/50 transition-colors">
      {children}
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-muted-foreground">
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
