import { createFileRoute } from "@tanstack/react-router";
import { ChevronsUpDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Card,
  CardHeader,
  Avatar,
  Pill,
  ScoreBar,
} from "@/components/admin/primitives";
import {
  DAILY_SERIES,
  USERS,
  COLLEGE_BREAKDOWN,
} from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — IntelFeed Admin" },
      { name: "description", content: "Activity trends, top contributors, and college-wise breakdowns." },
      { property: "og:title", content: "Reports — IntelFeed Admin" },
      { property: "og:description", content: "Activity trends, top contributors, and college-wise breakdowns." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const top = [...USERS].sort((a, b) => b.tipsSubmitted - a.tipsSubmitted).slice(0, 6);
  const totals = COLLEGE_BREAKDOWN.reduce(
    (acc, c) => ({
      total: acc.total + c.total,
      published: acc.published + c.published,
      pending: acc.pending + c.pending,
      disputed: acc.disputed + c.disputed,
      expired: acc.expired + c.expired,
      activeSeniors: acc.activeSeniors + c.activeSeniors,
    }),
    { total: 0, published: 0, pending: 0, disputed: 0, expired: 0, activeSeniors: 0 },
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Reports</h1>
        <div className="flex items-center gap-2">
          <input
            type="date"
            defaultValue="2026-05-01"
            className="h-9 rounded-xl border border-border bg-card px-3 text-[13px]"
          />
          <span className="text-[12px] text-muted-foreground">to</span>
          <input
            type="date"
            defaultValue="2026-05-19"
            className="h-9 rounded-xl border border-border bg-card px-3 text-[13px]"
          />
          <button className="h-9 rounded-xl bg-primary px-4 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90">
            Apply
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader title="Tip activity" />
          <div className="px-2 pb-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DAILY_SERIES} margin={{ top: 8, right: 24, left: 12, bottom: 0 }}>
                <CartesianGrid stroke="oklch(0.97 0.018 235)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "oklch(0.55 0.03 250)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.55 0.03 250)" }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid oklch(0.94 0.025 235)",
                    fontSize: 12,
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
                  verticalAlign="top"
                  align="right"
                />
                <Line
                  type="monotone"
                  dataKey="submitted"
                  stroke="oklch(0.78 0.13 230)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Submitted"
                />
                <Line
                  type="monotone"
                  dataKey="verified"
                  stroke="oklch(0.78 0.15 160)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Verified"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Top contributors"
            right={
              <button className="text-[12px] text-muted-foreground hover:text-foreground">
                Download as PDF
              </button>
            }
          />
          <div className="px-6 pb-5">
            {top.map((u, i) => (
              <div
                key={u.id}
                className={[
                  "grid grid-cols-[40px_1fr_120px_120px_120px_180px] items-center gap-4 py-3 border-b border-border-soft last:border-0 rounded-md px-2",
                  i < 3 ? "bg-warn-soft/60" : "",
                ].join(" ")}
              >
                <span className="text-[15px] font-bold text-muted-foreground tabular-nums">
                  #{i + 1}
                </span>
                <div className="flex items-center gap-3">
                  <Avatar initials={u.initials} size={32} />
                  <div>
                    <p className="text-[13px] font-semibold text-foreground leading-tight">{u.name}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">{u.college}</p>
                  </div>
                </div>
                <div className="text-[13px] tabular-nums">
                  <span className="text-primary font-bold">{u.tipsSubmitted}</span>{" "}
                  <span className="text-[11px] text-muted-foreground">tips</span>
                </div>
                <div className="text-[13px] tabular-nums">
                  <span className="text-[oklch(0.55_0.15_160)] font-bold">{u.tipsVerified}</span>{" "}
                  <span className="text-[11px] text-muted-foreground">verified</span>
                </div>
                <div className="text-[13px] tabular-nums">
                  <span className="text-[oklch(0.62_0.16_85)] font-bold">{u.accuracy}%</span>{" "}
                  <span className="text-[11px] text-muted-foreground">accuracy</span>
                </div>
                <ScoreBar score={u.credibility} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="College-wise breakdown" />
          <div className="overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Th>College</Th>
                  <Th sortable align="right">Total</Th>
                  <Th sortable align="right">Published</Th>
                  <Th sortable align="right">Pending</Th>
                  <Th sortable align="right">Disputed</Th>
                  <Th sortable align="right">Expired</Th>
                  <Th sortable align="right">Active Seniors</Th>
                  <Th align="right">Coverage</Th>
                </tr>
              </thead>
              <tbody>
                {COLLEGE_BREAKDOWN.map((c) => (
                  <tr
                    key={c.college}
                    className="border-b border-border-soft hover:bg-row-hover transition-colors h-12"
                  >
                    <Td>{c.college}</Td>
                    <Td align="right" mono>{c.total}</Td>
                    <Td align="right" mono>{c.published}</Td>
                    <Td align="right" mono>{c.pending}</Td>
                    <Td align="right" mono>{c.disputed}</Td>
                    <Td align="right" mono>{c.expired}</Td>
                    <Td align="right" mono>{c.activeSeniors}</Td>
                    <td className="px-5 text-right">
                      <Pill
                        tone={
                          c.coverage === "High"
                            ? "mint"
                            : c.coverage === "Medium"
                              ? "warn"
                              : "coral"
                        }
                      >
                        {c.coverage}
                      </Pill>
                    </td>
                  </tr>
                ))}
                <tr className="bg-[oklch(0.978_0.018_235)] font-bold h-12">
                  <Td>Total</Td>
                  <Td align="right" mono>{totals.total}</Td>
                  <Td align="right" mono>{totals.published}</Td>
                  <Td align="right" mono>{totals.pending}</Td>
                  <Td align="right" mono>{totals.disputed}</Td>
                  <Td align="right" mono>{totals.expired}</Td>
                  <Td align="right" mono>{totals.activeSeniors}</Td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Th({
  children,
  align = "left",
  sortable,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  sortable?: boolean;
}) {
  return (
    <th
      className={`font-medium px-5 py-3 ${align === "right" ? "text-right" : ""}`}
    >
      <span className={`inline-flex items-center gap-1 ${align === "right" ? "flex-row-reverse" : ""}`}>
        {children}
        {sortable && <ChevronsUpDown className="h-3 w-3 text-muted-foreground/60" />}
      </span>
    </th>
  );
}

function Td({
  children,
  align = "left",
  mono,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  mono?: boolean;
}) {
  return (
    <td
      className={[
        "px-5 text-[13px] text-foreground",
        align === "right" ? "text-right" : "",
        mono ? "tabular-nums" : "",
      ].join(" ")}
    >
      {children}
    </td>
  );
}
