import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Card, FilterButton } from "@/components/admin/primitives";
import { COVERAGE } from "@/lib/mock-data";

export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "Coverage Gaps — IntelFeed Admin" },
      { name: "description", content: "Departments with low or no intel this semester — close the gaps." },
      { property: "og:title", content: "Coverage Gaps — IntelFeed Admin" },
      { property: "og:description", content: "Departments with low or no intel this semester — close the gaps." },
    ],
  }),
  component: CoveragePage,
});

function tier(tips: number) {
  if (tips === 0) return "none" as const;
  if (tips <= 3) return "low" as const;
  return "ok" as const;
}

function CoveragePage() {
  const [hover, setHover] = useState<string | null>(null);

  const none = COVERAGE.filter((c) => tier(c.tips) === "none").length;
  const low = COVERAGE.filter((c) => tier(c.tips) === "low").length;
  const ok = COVERAGE.filter((c) => tier(c.tips) === "ok").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Coverage gaps</h1>
        <div className="flex items-center gap-2">
          <FilterButton>All Colleges</FilterButton>
          <FilterButton>This semester</FilterButton>
        </div>
      </div>
      <p className="mb-6 text-[14px] text-muted-foreground">
        Departments with low or no intel this semester.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryBox label="0 tips departments" value={none} tone="coral" />
        <SummaryBox label="1–3 tips departments" value={low} tone="warn" />
        <SummaryBox label="Well covered" value={ok} tone="mint" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {COVERAGE.map((c) => {
          const t = tier(c.tips);
          const bg =
            t === "none"
              ? "bg-[oklch(0.985_0.02_50)]"
              : t === "low"
                ? "bg-[oklch(0.99_0.03_90)]"
                : "bg-card";
          const barColor =
            t === "none"
              ? "oklch(0.74 0.16 50)"
              : t === "low"
                ? "oklch(0.82 0.16 85)"
                : "oklch(0.78 0.15 160)";
          const fillW = t === "none" ? 8 : t === "low" ? 30 : 80;
          const key = `${c.college}-${c.department}`;

          return (
            <div
              key={key}
              onMouseEnter={() => setHover(key)}
              onMouseLeave={() => setHover(null)}
              className={`relative rounded-2xl border border-border ${bg} p-5 transition-all`}
            >
              {t === "none" && (
                <span className="absolute top-3 right-3 rounded-full bg-coral-soft border border-[oklch(0.92_0.06_50)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.5_0.14_50)]">
                  No intel
                </span>
              )}
              {t === "low" && (
                <span className="absolute top-3 right-3 rounded-full bg-warn-soft border border-[oklch(0.92_0.08_90)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.48_0.14_85)]">
                  Low coverage
                </span>
              )}
              <p className="text-[15px] font-bold text-foreground">{c.department}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{c.college}</p>

              <div className="mt-4 h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${fillW}%`, backgroundColor: barColor }}
                />
              </div>

              <p
                className="mt-3 text-[13px] font-semibold tabular-nums"
                style={{ color: barColor }}
              >
                {c.tips} {c.tips === 1 ? "tip" : "tips"} this semester
              </p>

              <p
                className={[
                  "mt-1 text-[11px]",
                  c.lastIntelDays === null ? "text-[oklch(0.62_0.16_50)] font-semibold" : "text-muted-foreground",
                ].join(" ")}
              >
                {c.lastIntelDays === null ? "No intel yet" : `Last intel: ${c.lastIntelDays} day${c.lastIntelDays === 1 ? "" : "s"} ago`}
              </p>

              <button
                onClick={() => toast("Invitation sent to seniors")}
                className={[
                  "mt-4 w-full h-9 rounded-lg bg-primary text-primary-foreground text-[12px] font-semibold inline-flex items-center justify-center gap-1.5 transition-opacity",
                  hover === key ? "opacity-100" : "opacity-0 pointer-events-none",
                ].join(" ")}
              >
                <Send className="h-3.5 w-3.5" />
                Invite seniors to contribute
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryBox({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "coral" | "warn" | "mint";
}) {
  const c = {
    coral: "text-[oklch(0.62_0.16_50)]",
    warn: "text-[oklch(0.65_0.16_85)]",
    mint: "text-[oklch(0.6_0.15_160)]",
  }[tone];
  return (
    <Card className="px-5 py-4 flex items-center justify-between">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <span className={`text-[28px] font-bold tabular-nums ${c}`}>{value}</span>
    </Card>
  );
}
