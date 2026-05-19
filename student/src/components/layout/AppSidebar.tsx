import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Bookmark, CheckCircle2, Home, Inbox, PlusSquare, Search, ShieldCheck, User, Settings, Zap } from "lucide-react";
import { user } from "@/data/mock";

const nav = [
  { to: "/feed",          label: "Feed",         icon: Home },
  { to: "/search",        label: "Search",       icon: Search },
  { to: "/submit",        label: "Submit Tip",   icon: PlusSquare },
  { to: "/verify",        label: "Verify Queue", icon: ShieldCheck },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile",       label: "Profile",      icon: User },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className="fixed left-0 top-0 z-30 flex h-screen w-[240px] flex-col"
      style={{ background: "var(--color-sidebar)", color: "var(--color-sidebar-foreground)" }}
    >
      <div className="flex items-center gap-2 px-6 pt-6 pb-8">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15">
          <Zap className="h-4 w-4 text-primary" strokeWidth={2.5} />
        </div>
        <span className="text-[18px] font-extrabold tracking-tight text-primary">IntelFeed</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {nav.map((item) => {
          const active = pathname.startsWith(item.to) || (item.to === "/feed" && pathname === "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px] transition-colors"
              style={{
                color: active ? "var(--color-primary)" : "rgba(255,255,255,0.85)",
                background: active ? "var(--color-sidebar-active)" : "transparent",
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full"
                  style={{ background: "var(--color-primary)" }}
                />
              )}
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-4 mt-2 flex items-center gap-3 rounded-lg px-3 py-3" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold"
          style={{ background: "var(--color-primary)", color: "var(--color-primary-dark)" }}
        >
          {user.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="truncate text-[13px] font-medium text-white">{user.name}</div>
          <div className="truncate text-[11px] text-primary">{user.shortDept}</div>
        </div>
        <button className="text-white/60 hover:text-white" aria-label="Settings">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
