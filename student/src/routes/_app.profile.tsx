import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { CategoryBadge, PlainBadge } from "@/components/ui-bits/CategoryBadge";
import { user, mySubmissions } from "@/data/mock";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: `${user.name} — IntelFeed Profile` }] }),
  component: ProfilePage,
});

const tiers = ["Insider", "Scout", "Oracle", "Legend"] as const;

function ProfilePage() {
  const tierIdx = tiers.indexOf(user.tier);

  return (
    <>
      {/* hero */}
      <div className="card-base flex items-center gap-8 p-7">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-[24px] font-bold"
          style={{ background: "var(--color-primary)", color: "var(--color-primary-dark)" }}
        >
          {user.initials}
        </div>
        <div className="flex-1">
          <h1 className="text-[22px] font-bold text-foreground">{user.name}</h1>
          <p className="mt-0.5 text-[14px] text-muted-foreground">{user.dept} · {user.college}</p>
          <div className="mt-3 flex gap-2">
            <PlainBadge tone="muted">CSE · Final Year</PlainBadge>
            <PlainBadge tone="muted">{user.college}</PlainBadge>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline justify-end gap-2">
            <span className="text-[48px] font-extrabold leading-none text-primary">{user.credibility}</span>
            <span className="text-[12px] text-muted-foreground">out of 100</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "var(--color-yellow-soft)", color: "oklch(0.45 0.11 75)" }}>
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-[12px] font-semibold">{user.tier}</span>
          </div>
          <div className="mt-3 flex gap-1">
            {tiers.map((t, i) => (
              <div
                key={t}
                className="h-2 w-14 rounded-full"
                style={{ background: i <= tierIdx ? "var(--color-primary)" : "var(--color-border)" }}
                title={t}
              />
            ))}
          </div>
          <div className="mt-1.5 flex gap-1">
            {tiers.map((t) => (
              <div key={t} className="w-14 text-center text-[9px] uppercase tracking-wider" style={{ color: t === user.tier ? "var(--color-primary)" : "var(--color-muted-foreground)" }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="mt-5 grid grid-cols-3 gap-5">
        <StatBox value={user.stats.submitted} label="Tips Submitted" color="primary" />
        <StatBox value={user.stats.verified}  label="Verified"       color="mint" />
        <StatBox value={`${user.stats.accuracy}%`} label="Accuracy"  color="yellow" />
      </div>

      {/* my intel */}
      <div className="mt-9">
        <div className="label-eyebrow">My intel</div>
        <div className="mt-3 card-base overflow-hidden">
          <table className="w-full text-[13px]">
            <thead style={{ background: "color-mix(in oklab, var(--color-primary) 6%, white)" }}>
              <tr className="text-left">
                <Th>Tip preview</Th>
                <Th>Category</Th>
                <Th>Dept</Th>
                <Th>Submitted</Th>
                <Th>Status</Th>
                <Th className="text-right">Verifiers</Th>
              </tr>
            </thead>
            <tbody>
              {mySubmissions.map((m) => (
                <tr key={m.id} className="border-t border-border hover:bg-[color-mix(in_oklab,var(--color-primary)_4%,white)]">
                  <Td>
                    <Link to="/tip/$tipId" params={{ tipId: "t1" }} className="font-medium text-foreground hover:text-primary">
                      {m.title}
                    </Link>
                  </Td>
                  <Td><CategoryBadge category={m.category} size="xs" /></Td>
                  <Td className="text-muted-foreground">{m.dept}</Td>
                  <Td className="text-muted-foreground">{m.date}</Td>
                  <Td><StatusTag status={m.status} /></Td>
                  <Td className="text-right font-semibold text-foreground">{m.verifierCount}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function StatBox({ value, label, color }: { value: number | string; label: string; color: "primary" | "mint" | "yellow" }) {
  const fg = { primary: "var(--color-primary)", mint: "var(--color-mint)", yellow: "var(--color-yellow)" }[color];
  return (
    <div className="card-base p-5">
      <div className="text-[28px] font-extrabold leading-none" style={{ color: fg }}>{value}</div>
      <div className="mt-1.5 text-[12px] text-muted-foreground">{label}</div>
    </div>
  );
}

function StatusTag({ status }: { status: "published" | "pending" | "disputed" }) {
  const map = {
    published: { bg: "var(--color-mint-soft)",   fg: "oklch(0.4 0.1 165)", label: "Published" },
    pending:   { bg: "var(--color-yellow-soft)", fg: "oklch(0.45 0.11 75)", label: "Pending" },
    disputed:  { bg: "var(--color-coral-soft)",  fg: "var(--color-coral)", label: "Disputed" },
  }[status];
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: map.bg, color: map.fg }}>
      {map.label}
    </span>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-5 py-3.5 ${className}`}>{children}</td>;
}
