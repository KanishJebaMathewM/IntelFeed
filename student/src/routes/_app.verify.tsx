import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, X } from "lucide-react";
import { CategoryBadge, PlainBadge } from "@/components/ui-bits/CategoryBadge";
import { tips } from "@/data/mock";

export const Route = createFileRoute("/_app/verify")({
  head: () => ({ meta: [{ title: "Verify intel — IntelFeed" }] }),
  component: VerifyPage,
});

function VerifyPage() {
  const tip = tips[1];

  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-foreground">Verify intel</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">Your branch needs 3 verifiers per tip.</p>
        </div>
      </div>

      {/* progress */}
      <div className="mt-6 card-base p-5">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium text-foreground">2 of 5 tips verified by you this week</span>
          <span className="text-muted-foreground">40%</span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-2 flex-1 rounded-full" style={{ background: i < 2 ? "var(--color-primary)" : "var(--color-border)" }} />
          ))}
        </div>
      </div>

      <div className="mt-8 mx-auto max-w-[800px]">
        <div className="card-base p-8">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={tip.category} />
            <PlainBadge tone="yellow">{tip.dept}</PlainBadge>
            <PlainBadge tone="muted">{tip.college}</PlainBadge>
          </div>
          <h2 className="mt-5 text-[18px] font-bold leading-snug text-foreground">{tip.title}</h2>
          <p className="mt-4 text-[15px] leading-7 text-foreground/85">{tip.body}</p>

          <div className="my-7 h-px bg-border" />

          <div className="relative rounded-xl p-5" style={{ background: "#F8FAFC" }}>
            <span className="absolute left-3 top-1 text-[40px] leading-none text-muted-foreground/40">"</span>
            <p className="pl-6 text-[13px] italic text-muted-foreground">
              I noticed this pattern across 4 batches — checked previous papers myself in the library.
            </p>
          </div>

          <div className="mt-7 label-eyebrow">Your verdict</div>
          <div className="mt-3 flex gap-3">
            <VerdictBtn tone="mint" label="Confirm" Icon={Check} />
            <VerdictBtn tone="coral" label="Dispute" Icon={X} />
            <VerdictBtn tone="muted" label="Add context" Icon={Plus} />
          </div>

          <button className="mt-5 block text-[12px] text-muted-foreground hover:text-foreground">Skip this tip.</button>
        </div>
      </div>
    </>
  );
}

function VerdictBtn({ tone, label, Icon }: { tone: "mint" | "coral" | "muted"; label: string; Icon: typeof Check }) {
  const palette = {
    mint:   { bg: "var(--color-mint-soft)",  fg: "oklch(0.4 0.1 165)", border: "var(--color-mint)" },
    coral:  { bg: "var(--color-coral-soft)", fg: "var(--color-coral)", border: "var(--color-coral)" },
    muted:  { bg: "white",                   fg: "var(--color-foreground)", border: "var(--color-border)" },
  }[tone];
  return (
    <button
      className="inline-flex h-14 w-[200px] items-center justify-center gap-2 rounded-xl text-[14px] font-semibold transition-transform hover:scale-[1.02]"
      style={{ background: palette.bg, color: palette.fg, border: `2px solid ${palette.border}` }}
    >
      <Icon className="h-[18px] w-[18px]" />
      {label}
    </button>
  );
}
