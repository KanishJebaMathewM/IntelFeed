import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  AlertTriangle,
  BarChart3,
  Zap,
  LogOut,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/tips", label: "Tip Management", icon: FileText },
  { to: "/users", label: "User Management", icon: Users },
  { to: "/broadcast", label: "Broadcast Nudge", icon: Megaphone },
  { to: "/coverage", label: "Coverage Gaps", icon: AlertTriangle },
  { to: "/reports", label: "Reports", icon: BarChart3 },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="w-[260px] shrink-0 bg-sidebar text-sidebar-foreground flex flex-col sticky top-0 h-screen">
      <div className="px-6 pt-7 pb-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/15">
            <Zap className="h-4 w-4 text-primary" strokeWidth={2.4} />
          </span>
          <span className="text-[18px] font-bold tracking-tight text-white">IntelFeed</span>
        </div>
        <p className="mt-1 ml-9 text-[11px] text-white/45">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {NAV.map((item) => {
          const active = path === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "relative flex items-center gap-3 rounded-md pl-4 pr-3 py-2.5 text-[14px] transition-colors",
                active
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-white/75 hover:text-white hover:bg-sidebar-accent/60",
              ].join(" ")}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-primary" />
              )}
              <Icon
                className={["h-[18px] w-[18px]", active ? "text-primary" : "text-primary/80"].join(" ")}
                strokeWidth={1.75}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-4 mt-2 rounded-lg bg-sidebar-accent/50 p-3 flex items-center gap-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[12px] font-semibold">
          AD
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-[13px] font-semibold leading-tight truncate">Admin</p>
          <p className="text-primary text-[11px] leading-tight">Super Admin</p>
        </div>
        <button className="text-white/50 hover:text-white transition-colors" aria-label="Log out">
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
