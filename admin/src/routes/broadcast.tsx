import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Globe, Building2, Users as UsersIcon, Bell, Siren, Zap } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/admin/primitives";
import { COLLEGES, BRANCHES } from "@/lib/mock-data";

export const Route = createFileRoute("/broadcast")({
  head: () => ({
    meta: [
      { title: "Broadcast Nudge — IntelFeed Admin" },
      { name: "description", content: "Push time-sensitive alerts to students across colleges or branches." },
      { property: "og:title", content: "Broadcast Nudge — IntelFeed Admin" },
      { property: "og:description", content: "Push time-sensitive alerts to students across colleges or branches." },
    ],
  }),
  component: BroadcastPage,
});

type Audience = "all" | "college" | "branch";

function BroadcastPage() {
  const [audience, setAudience] = useState<Audience>("all");
  const [college, setCollege] = useState<string>(COLLEGES[0]);
  const [branch, setBranch] = useState<string>(BRANCHES[0]);
  const [title, setTitle] = useState("Tata Scholarship closes this Friday");
  const [body, setBody] = useState(
    "Submit income proof and 200-word SOP via the scholarship portal before 11:59pm Friday. Cutoff was 8.4 CGPA last year.",
  );
  const [urgent, setUrgent] = useState(true);
  const [scheduleNow, setScheduleNow] = useState(true);

  const reach = useMemo(() => {
    if (audience === "all") return 12_400;
    if (audience === "college") return 2_400;
    return 380;
  }, [audience]);

  return (
    <div>
      <h1 className="text-[22px] font-bold tracking-tight text-foreground">Send a nudge</h1>
      <p className="mt-1 mb-6 text-[14px] text-muted-foreground">
        Push a time-sensitive alert to students across colleges or branches.
      </p>

      <div className="grid grid-cols-[640px_1fr] gap-6">
        <Card className="p-6 space-y-6">
          <section>
            <Label>Target audience</Label>
            <div className="grid grid-cols-3 gap-3">
              <AudienceCard
                icon={<Globe className="h-5 w-5" />}
                label="All colleges"
                hint="12.4k students"
                active={audience === "all"}
                onClick={() => setAudience("all")}
              />
              <AudienceCard
                icon={<Building2 className="h-5 w-5" />}
                label="Specific college"
                hint="~2.4k students"
                active={audience === "college"}
                onClick={() => setAudience("college")}
              />
              <AudienceCard
                icon={<UsersIcon className="h-5 w-5" />}
                label="Specific branch"
                hint="~380 students"
                active={audience === "branch"}
                onClick={() => setAudience("branch")}
              />
            </div>
            {audience !== "all" && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Select value={college} onChange={setCollege} options={COLLEGES} />
                {audience === "branch" && (
                  <Select value={branch} onChange={setBranch} options={BRANCHES} />
                )}
              </div>
            )}
          </section>

          <section>
            <Label>Nudge title</Label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Tata Scholarship closes this Friday."
              className="w-full h-11 rounded-xl border border-border bg-card px-4 text-[14px] focus:outline-none focus:border-primary"
            />
          </section>

          <section>
            <Label>Nudge body</Label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Add context, link, or action steps."
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] resize-none focus:outline-none focus:border-primary"
            />
          </section>

          <section>
            <Label>Urgency level</Label>
            <div className="grid grid-cols-2 gap-3">
              <ToggleCard
                icon={<Bell className="h-5 w-5 text-primary" />}
                label="Normal"
                hint="Standard delivery"
                active={!urgent}
                onClick={() => setUrgent(false)}
              />
              <ToggleCard
                icon={<Siren className="h-5 w-5 text-coral" />}
                label="Urgent"
                hint="Push + lockscreen"
                active={urgent}
                onClick={() => setUrgent(true)}
              />
            </div>
          </section>

          <section>
            <Label>Schedule</Label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScheduleNow(true)}
                className={[
                  "flex-1 h-11 rounded-xl text-[13px] font-medium border transition-colors",
                  scheduleNow
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/50",
                ].join(" ")}
              >
                Send now
              </button>
              <input
                type="datetime-local"
                disabled={scheduleNow}
                onFocus={() => setScheduleNow(false)}
                className="flex-1 h-11 rounded-xl border border-border bg-card px-4 text-[13px] disabled:opacity-50 focus:outline-none focus:border-primary"
              />
            </div>
          </section>

          <div className="pt-2">
            <p className="text-[12px] text-muted-foreground mb-2">
              This will notify {reach.toLocaleString()} students based on your selection
            </p>
            <button
              onClick={() => toast.success("Nudge queued for delivery")}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-[14px] font-bold hover:bg-primary/90 transition-colors"
            >
              Send Nudge
            </button>
          </div>
        </Card>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Preview</p>
          <div className="mx-auto w-[280px] rounded-[40px] border-2 border-border-soft bg-secondary p-4 shadow-none">
            <div className="rounded-2xl bg-card border border-border p-3.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary-dark">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                </span>
                <span className="text-[11px] font-semibold text-foreground">IntelFeed</span>
                <span className="text-[10px] text-muted-foreground ml-auto">now</span>
              </div>
              <p className="mt-2.5 text-[13px] font-semibold text-foreground leading-tight">
                {title || "Nudge title preview"}
              </p>
              <p className="mt-1 text-[11.5px] text-muted-foreground leading-snug line-clamp-3">
                {body || "Nudge body preview text will appear here."}
              </p>
              {urgent && (
                <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-coral-soft border border-[oklch(0.92_0.06_50)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.5_0.14_50)]">
                  <Siren className="h-3 w-3" />
                  URGENT
                </span>
              )}
            </div>
          </div>
          <div className="mt-5 mx-auto w-[280px] rounded-xl border border-border bg-card px-4 py-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Estimated reach</span>
              <span className="text-[12px] font-bold text-primary tabular-nums">
                {reach.toLocaleString()} students
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Avg open rate</span>
              <span className="text-[12px] font-bold text-[oklch(0.55_0.15_160)] tabular-nums">68%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2.5 font-semibold">
      {children}
    </p>
  );
}

function AudienceCard({
  icon,
  label,
  hint,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-xl border p-4 text-left transition-colors",
        active
          ? "border-primary bg-[oklch(0.98_0.025_230)]"
          : "border-border bg-card hover:border-primary/40",
      ].join(" ")}
    >
      <span className={active ? "text-primary" : "text-muted-foreground"}>{icon}</span>
      <p className="mt-3 text-[13px] font-semibold text-foreground">{label}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{hint}</p>
    </button>
  );
}

function ToggleCard({
  icon,
  label,
  hint,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-xl border p-4 text-left transition-colors flex items-center gap-3",
        active ? "border-primary bg-[oklch(0.98_0.025_230)]" : "border-border bg-card hover:border-primary/40",
      ].join(" ")}
    >
      {icon}
      <div>
        <p className="text-[13px] font-semibold text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </div>
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 rounded-xl border border-border bg-card px-3 text-[13px] focus:outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
