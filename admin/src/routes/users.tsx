import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Eye, AlertTriangle, Ban } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  Pill,
  Avatar,
  FilterButton,
  ScoreBar,
} from "@/components/admin/primitives";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { USERS, type AdminUser } from "@/lib/mock-data";

export const Route = createFileRoute("/users")({
  head: () => ({
    meta: [
      { title: "User Management — IntelFeed Admin" },
      { name: "description", content: "Review students and seniors, credibility scores, and account status." },
      { property: "og:title", content: "User Management — IntelFeed Admin" },
      { property: "og:description", content: "Review students and seniors, credibility scores, and account status." },
    ],
  }),
  component: UsersPage,
});

function UsersPage() {
  const [role, setRole] = useState<"Student" | "Senior">("Senior");
  const [open, setOpen] = useState<AdminUser | null>(null);
  const list = USERS.filter((u) => u.role === role);

  const studentCount = USERS.filter((u) => u.role === "Student").length;
  const seniorCount = USERS.filter((u) => u.role === "Senior").length;
  const avgCred = Math.round(
    USERS.reduce((s, u) => s + u.credibility, 0) / USERS.length,
  );
  const banned = USERS.filter((u) => u.status === "Banned").length;
  const pending = USERS.filter((u) => u.status === "Pending").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Users</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <input
              placeholder="Search users…"
              className="h-9 w-64 rounded-xl border border-border bg-card pl-9 pr-3 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <FilterButton>All Colleges</FilterButton>
          <FilterButton>All Branches</FilterButton>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5">
        {(["Students", "Seniors"] as const).map((label) => {
          const key = label.slice(0, -1) as "Student" | "Senior";
          const active = role === key;
          return (
            <button
              key={label}
              onClick={() => setRole(key)}
              className={[
                "h-10 rounded-full px-6 text-[13px] font-semibold border transition-colors",
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-4">
        <Card className="overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="font-medium px-5 py-3">User</th>
                <th className="font-medium px-3 py-3">College</th>
                <th className="font-medium px-3 py-3">Branch</th>
                <th className="font-medium px-3 py-3">Role</th>
                <th className="font-medium px-3 py-3">Credibility</th>
                <th className="font-medium px-3 py-3">Tips</th>
                <th className="font-medium px-3 py-3">Verified</th>
                <th className="font-medium px-3 py-3">Accuracy</th>
                <th className="font-medium px-3 py-3">Status</th>
                <th className="font-medium px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr
                  key={u.id}
                  onClick={() => setOpen(u)}
                  className="border-b border-border-soft last:border-0 hover:bg-row-hover transition-colors cursor-pointer h-[60px]"
                >
                  <td className="px-5 py-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={u.initials} size={32} />
                      <div>
                        <p className="text-[13px] font-semibold text-foreground leading-tight">
                          {u.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-tight">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 text-[12px] text-muted-foreground">{u.college}</td>
                  <td className="px-3 text-[12px] text-muted-foreground">{u.branch}</td>
                  <td className="px-3">
                    <Pill tone={u.role === "Senior" ? "coral" : "primary"}>{u.role}</Pill>
                  </td>
                  <td className="px-3">
                    <ScoreBar score={u.credibility} />
                  </td>
                  <td className="px-3 text-[13px] font-semibold tabular-nums text-foreground">
                    {u.tipsSubmitted}
                  </td>
                  <td className="px-3 text-[13px] font-semibold tabular-nums text-[oklch(0.55_0.15_160)]">
                    {u.tipsVerified}
                  </td>
                  <td className="px-3 text-[13px] font-semibold tabular-nums text-[oklch(0.62_0.16_85)]">
                    {u.accuracy}%
                  </td>
                  <td className="px-3">
                    <Pill
                      tone={
                        u.status === "Active"
                          ? "mint"
                          : u.status === "Banned"
                            ? "coral"
                            : "muted"
                      }
                    >
                      {u.status}
                    </Pill>
                  </td>
                  <td className="px-5">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setOpen(u)}
                        className="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center"
                      >
                        <Eye className="h-4 w-4 text-primary" />
                      </button>
                      <button
                        onClick={() => toast("User warned")}
                        className="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center"
                      >
                        <AlertTriangle className="h-4 w-4 text-[oklch(0.65_0.16_85)]" />
                      </button>
                      <button
                        onClick={() => toast.error("User banned")}
                        className="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center"
                      >
                        <Ban className="h-4 w-4 text-[oklch(0.62_0.16_50)]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="self-start sticky top-6">
          <CardHeader title="User health snapshot" />
          <div className="px-6 pb-6 space-y-4">
            <MetricRow label="Total students" value={studentCount.toLocaleString()} tone="primary" />
            <MetricRow label="Total seniors" value={seniorCount.toLocaleString()} tone="coral" />
            <MetricRow label="Avg credibility" value={`${avgCred}`} tone="mint" />
            <MetricRow label="Banned accounts" value={`${banned}`} tone="coral" />
            <MetricRow label="Pending email verify" value={`${pending}`} tone="warn" />
          </div>
        </Card>
      </div>

      <Sheet open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <SheetContent side="right" className="w-[400px] sm:max-w-[400px] p-0 flex flex-col bg-card">
          {open && (
            <>
              <SheetHeader className="px-6 pt-6 pb-5 border-b border-border-soft">
                <div className="flex items-center gap-3">
                  <Avatar initials={open.initials} size={48} />
                  <div>
                    <SheetTitle className="text-[16px] font-semibold text-foreground">
                      {open.name}
                    </SheetTitle>
                    <p className="text-[12px] text-muted-foreground">
                      {open.college} · {open.branch}
                    </p>
                  </div>
                </div>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <section>
                  <h4 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                    Credibility breakdown
                  </h4>
                  <div className="rounded-xl border border-border-soft p-4 space-y-3">
                    <Row label="Score" value={`${open.credibility} / 100`} />
                    <Row label="Tips submitted" value={`${open.tipsSubmitted}`} />
                    <Row label="Tips verified" value={`${open.tipsVerified}`} />
                    <Row label="Accuracy streak" value={`${open.accuracy}%`} />
                  </div>
                </section>
                <section>
                  <h4 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                    Recent submissions
                  </h4>
                  <div className="space-y-2">
                    {["TCS hiring freeze update", "Hostel mess menu change", "DRDO internship intel"].map(
                      (t, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border border-border-soft px-3 py-2.5"
                        >
                          <span className="text-[12px] text-foreground">{t}</span>
                          <Pill tone={i === 0 ? "mint" : i === 1 ? "mint" : "warn"}>
                            {i === 2 ? "Pending" : "Published"}
                          </Pill>
                        </div>
                      ),
                    )}
                  </div>
                </section>
              </div>
              <div className="px-6 py-4 border-t border-border-soft grid grid-cols-3 gap-2">
                <button
                  onClick={() => toast("User warned")}
                  className="h-10 rounded-xl bg-warn text-white text-[12px] font-semibold hover:opacity-90"
                >
                  Warn user
                </button>
                <button
                  onClick={() => toast.error("Account banned")}
                  className="h-10 rounded-xl bg-coral text-white text-[12px] font-semibold hover:opacity-90"
                >
                  Ban account
                </button>
                <button
                  onClick={() => toast("Credibility reset")}
                  className="h-10 rounded-xl bg-secondary text-foreground text-[12px] font-semibold hover:bg-row-hover border border-border"
                >
                  Reset score
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MetricRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "primary" | "mint" | "coral" | "warn";
}) {
  const c = {
    primary: "text-primary",
    mint: "text-[oklch(0.6_0.15_160)]",
    coral: "text-[oklch(0.62_0.16_50)]",
    warn: "text-[oklch(0.65_0.16_85)]",
  }[tone];
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <span className={`text-[20px] font-bold tabular-nums ${c}`}>{value}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <span className="text-[13px] font-semibold text-foreground tabular-nums">{value}</span>
    </div>
  );
}
