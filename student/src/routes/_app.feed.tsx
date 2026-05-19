import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Clock, Search } from "lucide-react";
import { useState } from "react";
import { TipCard } from "@/components/feed/TipCard";
import { CountdownChip } from "@/components/ui-bits/CountdownChip";
import { AvatarCircle } from "@/components/ui-bits/AvatarCircle";
import { tips, deadlines, contributors, branchCoverage, user } from "@/data/mock";

export const Route = createFileRoute("/_app/feed")({
  head: () => ({ meta: [{ title: "Feed — IntelFeed" }, { name: "description", content: "Latest verified intel for your branch." }] }),
  component: FeedPage,
});

const filters = ["All", "Scholarship", "Club", "Exam", "Internship", "Dept Norms", "Office Hours"];

function FeedPage() {
  const [active, setActive] = useState("All");
  const urgent = tips.filter((t) => t.urgent);
  const rest = tips.filter((t) => !t.urgent);

  return (
    <>
      {/* greeting */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-foreground">Good morning, {user.name.split(" ")[0]}</h1>
        <Link to="/notifications" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white">
          <Bell className="h-[20px] w-[20px] text-coral" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral" />
        </Link>
      </div>

      {/* search */}
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3">
        <Search className="h-[18px] w-[18px] text-primary" />
        <input
          className="flex-1 bg-transparent text-[14px] placeholder:text-muted-foreground outline-none"
          placeholder="Search tips, professors, clubs, deadlines…"
        />
      </div>

      {/* filters */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="shrink-0 rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors"
              style={{
                background: isActive ? "var(--color-primary)" : "white",
                color: isActive ? "white" : "var(--color-muted-foreground)",
                border: `1px solid ${isActive ? "var(--color-primary)" : "var(--color-border)"}`,
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* two columns */}
      <div className="mt-6 grid grid-cols-[740px_380px] gap-6">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-coral" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-coral">Urgent — closing soon</span>
          </div>
          <div className="mt-3 space-y-3">
            {urgent.map((t) => <TipCard key={t.id} tip={t} urgent />)}
          </div>

          <div className="mt-8 label-eyebrow">Latest intel</div>
          <div className="mt-3 space-y-3">
            {rest.map((t) => <TipCard key={t.id} tip={t} />)}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div className="card-base p-5">
            <h3 className="text-[15px] font-semibold text-foreground">Your deadline tracker</h3>
            <ul className="mt-4 space-y-3">
              {deadlines.map((d) => (
                <li key={d.id} className="flex items-start gap-3">
                  <CountdownChip days={d.daysLeft} tone={d.tone} />
                  <span className="text-[13px] leading-snug text-foreground">{d.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-base p-5">
            <h3 className="text-[15px] font-semibold text-foreground">Top contributors this week</h3>
            <ul className="mt-4 space-y-3">
              {contributors.map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <AvatarCircle initials={c.initials} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-[13px] font-medium text-foreground">{c.name}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{c.dept}</div>
                  </div>
                  <span className="text-[13px] font-bold text-primary">{c.score}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-base p-5">
            <h3 className="text-[15px] font-semibold text-foreground">Branch coverage</h3>
            <ul className="mt-4 space-y-2.5">
              {branchCoverage.map((b) => {
                const max = Math.max(...branchCoverage.map((x) => x.count));
                const pct = (b.count / max) * 100;
                const color = b.tone === "mint" ? "var(--color-mint)" : "var(--color-coral)";
                return (
                  <li key={b.dept}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-foreground font-medium">{b.dept}</span>
                      <span className="text-muted-foreground">{b.count} tips</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full" style={{ background: "var(--color-border)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
