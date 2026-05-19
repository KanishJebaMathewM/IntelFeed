import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import {
  FileText,
  Clock,
  GraduationCap,
  AlertCircle,
  Megaphone,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardHeader, Pill, SegmentedBar } from "@/components/admin/primitives";
import {
  DEPT_ACTIVITY,
  ACTIVITY,
  COLLEGE_HEALTH,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — IntelFeed Admin" },
      { name: "description", content: "Live verification health, tip volume, and platform activity at a glance." },
      { property: "og:title", content: "Overview — IntelFeed Admin" },
      { property: "og:description", content: "Live verification health, tip volume, and platform activity at a glance." },
    ],
  }),
  component: Overview,
});

const DATE_STR = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

function Overview() {
  const navigate = useNavigate();
  const maxDept = Math.max(...DEPT_ACTIVITY.map((d) => d.count));

  return (
    <div>
      <div className="flex items-end justify-between mb-7">
        <h1 className="text-[24px] font-bold tracking-tight text-foreground">
          Good morning, Admin.
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-muted-foreground">{DATE_STR}</span>
          <button
            onClick={() => navigate({ to: "/broadcast" })}
            className="inline-flex items-center gap-2 h-10 rounded-xl bg-primary px-4 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Megaphone className="h-4 w-4" />
            Send Broadcast
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<FileText className="h-4 w-4" />}
          iconTone="primary"
          label="Total Tips"
          value="1,284"
          valueTone="primary"
          delta={<span className="text-[oklch(0.5_0.13_160)]">+12 today</span>}
        />
        <StatCard
          icon={<Clock className="h-4 w-4" />}
          iconTone="warn"
          label="Pending Verification"
          value="47"
          valueTone="warn"
          delta={<span className="text-[oklch(0.5_0.14_50)]">8 overdue 48h</span>}
        />
        <StatCard
          icon={<GraduationCap className="h-4 w-4" />}
          iconTone="mint"
          label="Active Colleges"
          value="23"
          valueTone="mint"
          delta={<span className="text-muted-foreground">across 6 states</span>}
        />
        <StatCard
          icon={<AlertCircle className="h-4 w-4" />}
          iconTone="coral"
          label="Expiring This Week"
          value="19"
          valueTone="coral"
          delta={<span className="text-muted-foreground">needs urgent attention</span>}
        />
      </div>

      <div className="grid grid-cols-[720px_1fr] gap-4 mb-6">
        <Card>
          <CardHeader title="Tips submitted this week" right={<span className="text-[11px] uppercase tracking-wider text-muted-foreground">By department</span>} />
          <div className="px-6 pb-6 space-y-2.5">
            {DEPT_ACTIVITY.map((d) => {
              const w = (d.count / maxDept) * 100;
              const low = d.count < 100;
              return (
                <div key={d.dept} className="flex items-center gap-3">
                  <span className="w-28 text-[12px] text-muted-foreground">{d.dept}</span>
                  <div className="relative flex-1 h-7 rounded-md overflow-hidden bg-[oklch(0.97_0.018_235)]">
                    <div
                      className="h-full rounded-md transition-all"
                      style={{
                        width: `${w}%`,
                        backgroundColor: low ? "oklch(0.74 0.16 50)" : "oklch(0.78 0.13 230)",
                      }}
                    />
                  </div>
                  <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-foreground">
                    {d.count}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader title="Live activity" right={<span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />Live</span>} />
          <div className="px-6 pb-5 max-h-[420px] overflow-y-auto">
            {ACTIVITY.map((e, i) => {
              const dot =
                e.type === "verified"
                  ? "bg-mint"
                  : e.type === "submitted"
                    ? "bg-warn"
                    : "bg-coral";
              return (
                <div
                  key={e.id}
                  className={[
                    "flex items-start gap-3 py-3",
                    i !== ACTIVITY.length - 1 ? "border-b border-border-soft" : "",
                  ].join(" ")}
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-foreground leading-snug">{e.text}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Pill tone="muted">
                        {e.college} · {e.branch}
                      </Pill>
                    </div>
                  </div>
                  <span className="text-[11px] text-muted-foreground tabular-nums">{e.ago}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Verification health by college"
          right={<span className="text-[11px] uppercase tracking-wider text-muted-foreground">Verified · Pending · Disputed</span>}
        />
        <div className="px-6 pb-6 space-y-4">
          {COLLEGE_HEALTH.map((c) => (
            <div key={c.college} className="grid grid-cols-[180px_1fr_60px] items-center gap-4">
              <span className="text-[13px] font-medium text-foreground">{c.college}</span>
              <SegmentedBar
                verified={c.verified}
                pending={c.pending}
                disputed={c.disputed}
                total={c.total}
              />
              <span className="text-right text-[12px] font-semibold tabular-nums text-foreground">
                {c.total}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  iconTone,
  label,
  value,
  valueTone,
  delta,
}: {
  icon: React.ReactNode;
  iconTone: "primary" | "warn" | "mint" | "coral";
  label: string;
  value: string;
  valueTone: "primary" | "warn" | "mint" | "coral";
  delta: React.ReactNode;
}) {
  const iconBg: Record<typeof iconTone, string> = {
    primary: "bg-[oklch(0.97_0.04_230)] text-primary",
    warn: "bg-warn-soft text-[oklch(0.55_0.14_85)]",
    mint: "bg-mint-soft text-[oklch(0.5_0.13_160)]",
    coral: "bg-coral-soft text-[oklch(0.55_0.14_50)]",
  };
  const valueColor: Record<typeof valueTone, string> = {
    primary: "text-primary",
    warn: "text-[oklch(0.65_0.16_85)]",
    mint: "text-[oklch(0.6_0.15_160)]",
    coral: "text-[oklch(0.62_0.16_50)]",
  };
  return (
    <Card className="px-5 pt-5 pb-5">
      <div className="flex items-start justify-between">
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${iconBg[iconTone]}`}>
          {icon}
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground/40" />
      </div>
      <p className="mt-4 text-[12px] text-muted-foreground">{label}</p>
      <p className={`mt-1 text-[36px] font-bold tracking-tight leading-none ${valueColor[valueTone]}`}>
        {value}
      </p>
      <p className="mt-2 text-[12px]">{delta}</p>
    </Card>
  );
}
