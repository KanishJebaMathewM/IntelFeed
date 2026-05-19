import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Eye, Check, X, Flag } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  Pill,
  Avatar,
  FilterButton,
  PageHeading,
} from "@/components/admin/primitives";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { TIPS, type Tip } from "@/lib/mock-data";

export const Route = createFileRoute("/tips")({
  head: () => ({
    meta: [
      { title: "Tip Management — IntelFeed Admin" },
      { name: "description", content: "Review, verify, and publish tips submitted by seniors across colleges." },
      { property: "og:title", content: "Tip Management — IntelFeed Admin" },
      { property: "og:description", content: "Review, verify, and publish tips submitted by seniors across colleges." },
    ],
  }),
  component: TipsPage,
});

const TABS = [
  { key: "all", label: "All", count: 1284 },
  { key: "pending", label: "Pending", count: 47 },
  { key: "published", label: "Published", count: 1190 },
  { key: "disputed", label: "Disputed", count: 31 },
  { key: "expired", label: "Expired", count: 16 },
] as const;

function statusTone(s: Tip["status"]) {
  switch (s) {
    case "Pending":
      return "warn" as const;
    case "Published":
      return "mint" as const;
    case "Disputed":
      return "coral" as const;
    case "Expired":
      return "muted" as const;
  }
}

function TipsPage() {
  const [active, setActive] = useState<string>("all");
  const [open, setOpen] = useState<Tip | null>(null);

  const filtered =
    active === "all"
      ? TIPS
      : TIPS.filter((t) => t.status.toLowerCase() === active);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">All Tips</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <input
              placeholder="Search tips…"
              className="h-9 w-64 rounded-xl border border-border bg-card pl-9 pr-3 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <FilterButton>All Colleges</FilterButton>
          <FilterButton>All Departments</FilterButton>
          <FilterButton>All Categories</FilterButton>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 border-b border-border">
        <div className="flex items-center gap-1">
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={[
                  "px-4 py-2.5 text-[13px] -mb-px border-b-2 transition-colors",
                  isActive
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {t.label}{" "}
                <span className={isActive ? "text-primary/70" : "text-muted-foreground/70"}>
                  ({t.count.toLocaleString()})
                </span>
              </button>
            );
          })}
        </div>
        <button className="text-[12px] text-muted-foreground hover:text-foreground pb-2">
          Export CSV
        </button>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="font-medium px-5 py-3">Tip Preview</th>
              <th className="font-medium px-3 py-3">Department</th>
              <th className="font-medium px-3 py-3">College</th>
              <th className="font-medium px-3 py-3">Submitted By</th>
              <th className="font-medium px-3 py-3">Verified By</th>
              <th className="font-medium px-3 py-3">Status</th>
              <th className="font-medium px-3 py-3">Deadline</th>
              <th className="font-medium px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const due = new Date(t.deadline);
              const days = Math.ceil((due.getTime() - Date.now()) / 86_400_000);
              const overdue = days <= 3;
              return (
                <tr
                  key={t.id}
                  className="border-b border-border-soft last:border-0 hover:bg-row-hover transition-colors h-14"
                >
                  <td className="px-5 py-3 max-w-[320px]">
                    <p className="text-[13px] text-foreground line-clamp-1">{t.text}</p>
                    <span className="mt-1 inline-block text-[10px] uppercase tracking-wider text-primary font-semibold">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-3 text-[12px] text-muted-foreground">{t.department}</td>
                  <td className="px-3 text-[12px] text-muted-foreground">{t.college}</td>
                  <td className="px-3">
                    <div className="flex items-center gap-2">
                      <Avatar initials={t.submitter.initials} size={28} />
                      <div>
                        <p className="text-[12px] font-medium text-foreground leading-tight">
                          {t.submitter.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-tight">
                          {t.submitter.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3">
                    {t.verifiers.length > 0 ? (
                      <div className="flex items-center">
                        <div className="flex -space-x-1.5">
                          {t.verifiers.slice(0, 3).map((v, i) => (
                            <div key={i} className="ring-2 ring-card rounded-full">
                              <Avatar initials={v.initials} size={22} />
                            </div>
                          ))}
                        </div>
                        <span className="ml-2 text-[12px] font-semibold text-foreground">
                          {t.verifierCount}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[12px] text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-3">
                    <Pill tone={statusTone(t.status)}>{t.status}</Pill>
                  </td>
                  <td className="px-3">
                    <span
                      className={[
                        "text-[12px] tabular-nums",
                        overdue ? "text-[oklch(0.6_0.16_50)] font-semibold" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {due.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </td>
                  <td className="px-5">
                    <div className="flex items-center justify-end gap-1">
                      <IconBtn onClick={() => setOpen(t)} aria-label="View">
                        <Eye className="h-4 w-4 text-primary" />
                      </IconBtn>
                      <IconBtn onClick={() => toast.success("Tip approved")} aria-label="Approve">
                        <Check className="h-4 w-4 text-[oklch(0.55_0.15_160)]" />
                      </IconBtn>
                      <IconBtn onClick={() => toast.error("Tip rejected")} aria-label="Reject">
                        <X className="h-4 w-4 text-[oklch(0.6_0.16_50)]" />
                      </IconBtn>
                      <IconBtn onClick={() => toast("Flagged for review")} aria-label="Flag">
                        <Flag className="h-4 w-4 text-[oklch(0.65_0.16_85)]" />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-[12px] text-muted-foreground">
            Showing 1–{filtered.length} of 1,284
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={[
                  "h-8 w-8 rounded-md text-[12px] font-semibold transition-colors",
                  n === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:border-primary/50",
                ].join(" ")}
              >
                {n}
              </button>
            ))}
            <span className="px-2 text-muted-foreground text-[12px]">…</span>
            <button className="h-8 w-10 rounded-md bg-card border border-border text-[12px] font-semibold text-foreground">
              65
            </button>
          </div>
        </div>
      </Card>

      <Sheet open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <SheetContent side="right" className="w-[400px] sm:max-w-[400px] p-0 bg-card flex flex-col">
          {open && (
            <>
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-border-soft">
                <div className="flex items-center justify-between">
                  <Pill tone={statusTone(open.status)}>{open.status}</Pill>
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                    {open.category}
                  </span>
                </div>
                <SheetTitle className="mt-3 text-[16px] font-semibold leading-snug text-foreground">
                  {open.text}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <section>
                  <h4 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                    Full tip
                  </h4>
                  <p className="text-[13px] text-foreground leading-relaxed">{open.body}</p>
                </section>
                <section>
                  <h4 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                    Submitted by
                  </h4>
                  <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                    <Avatar initials={open.submitter.initials} size={36} />
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">{open.submitter.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {open.submitter.role} · {open.college}
                      </p>
                    </div>
                  </div>
                </section>
                <section>
                  <h4 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                    Verifiers ({open.verifierCount})
                  </h4>
                  {open.verifiers.length > 0 ? (
                    <div className="space-y-2">
                      {open.verifiers.map((v, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-lg border border-border-soft p-3">
                          <Avatar initials={v.initials} size={28} />
                          <div className="flex-1">
                            <p className="text-[12px] font-medium text-foreground">Senior verified</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              "Cross-checked with the CDC desk — matches."
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[12px] text-muted-foreground italic">
                      No verifiers yet — needs senior review.
                    </p>
                  )}
                </section>
              </div>
              <div className="px-6 py-4 border-t border-border-soft grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    toast.success("Approved and published");
                    setOpen(null);
                  }}
                  className="h-10 rounded-xl bg-mint text-white text-[13px] font-semibold hover:opacity-90"
                >
                  Approve and Publish
                </button>
                <button
                  onClick={() => {
                    toast.error("Tip rejected");
                    setOpen(null);
                  }}
                  className="h-10 rounded-xl bg-coral text-white text-[13px] font-semibold hover:opacity-90"
                >
                  Reject
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function IconBtn({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
    >
      {children}
    </button>
  );
}
