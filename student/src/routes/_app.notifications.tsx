import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell } from "lucide-react";
import { notifications } from "@/data/mock";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Nudges — IntelFeed" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const visible = notifications.filter((n) => (filter === "unread" ? n.unread : true));
  const today = visible.slice(0, 2);
  const earlier = visible.slice(2);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-foreground">Nudges</h1>
        <div className="flex rounded-full bg-white p-1 border border-border">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="rounded-full px-4 py-1.5 text-[12px] font-semibold"
              style={{
                background: filter === f ? "var(--color-primary)" : "transparent",
                color: filter === f ? "white" : "var(--color-muted-foreground)",
              }}
            >
              {f === "all" ? "All" : "Unread only"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_320px] gap-6">
        <div>
          <SectionHeader label="Today" />
          <div className="mt-2 space-y-2">
            {today.map((n) => <NotifRow key={n.id} n={n} />)}
          </div>

          <div className="mt-7">
            <SectionHeader label="Earlier" />
            <div className="mt-2 space-y-2">
              {earlier.map((n) => <NotifRow key={n.id} n={n} />)}
            </div>
          </div>
        </div>

        <aside className="sticky top-8 self-start card-base p-5">
          <h3 className="text-[15px] font-semibold text-foreground">This week's summary</h3>
          <ul className="mt-4 space-y-3 text-[13px]">
            <Stat label="Urgent tips" value="4" tone="coral" />
            <Stat label="Verified tips" value="11" tone="mint" />
            <Stat label="New intel in CSE" value="7" tone="primary" />
          </ul>
        </aside>
      </div>
    </>
  );
}

function SectionHeader({ label }: { label: string }) {
  return <div className="label-eyebrow">{label}</div>;
}

function NotifRow({ n }: { n: typeof notifications[number] }) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl border border-border px-5 py-4 hover:bg-[color-mix(in_oklab,var(--color-primary)_5%,white)]"
      style={{ background: n.urgent ? "color-mix(in oklab, var(--color-coral) 8%, white)" : "white" }}
    >
      {n.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
      {!n.unread && <span className="h-2 w-2" />}
      <Bell className="h-5 w-5" style={{ color: n.urgent ? "var(--color-coral)" : "var(--color-primary)" }} />
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-semibold text-foreground">{n.title}</div>
        <div className="mt-0.5 text-[12px] text-muted-foreground">{n.subtitle}</div>
      </div>
      <div className="flex items-center gap-3">
        {n.chip && (
          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: "var(--color-coral-soft)", color: "var(--color-coral)" }}>
            {n.chip}
          </span>
        )}
        <span className="text-[10px] text-muted-foreground">{n.time}</span>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "coral" | "mint" | "primary" }) {
  const color = tone === "coral" ? "var(--color-coral)" : tone === "mint" ? "var(--color-mint)" : "var(--color-primary)";
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-[20px] font-bold" style={{ color }}>{value}</span>
    </li>
  );
}
