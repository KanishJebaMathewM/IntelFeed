import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { CategoryBadge } from "@/components/ui-bits/CategoryBadge";
import { CountdownChip } from "@/components/ui-bits/CountdownChip";
import { AvatarStack } from "@/components/ui-bits/AvatarCircle";
import type { Tip } from "@/data/mock";

export function TipCard({ tip, urgent }: { tip: Tip; urgent?: boolean }) {
  return (
    <Link
      to="/tip/$tipId"
      params={{ tipId: tip.id }}
      className="card-base block p-5 transition-colors hover:bg-[color-mix(in_oklab,var(--color-primary)_5%,white)]"
      style={urgent ? { borderLeft: "3px solid var(--color-coral)" } : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <CategoryBadge category={tip.category} />
        {tip.daysLeft != null && (
          <CountdownChip
            days={tip.daysLeft}
            tone={urgent ? "coral" : tip.category === "exam" ? "yellow" : "primary"}
          />
        )}
      </div>
      <p className="mt-3 text-[15px] font-medium leading-snug text-foreground line-clamp-2">
        {tip.title}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AvatarStack items={tip.verifiers} />
          <span className="text-[11px] text-muted-foreground">
            verified by {tip.verifiers.length} senior{tip.verifiers.length === 1 ? "" : "s"}
          </span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="text-primary hover:text-primary-dark"
          aria-label="Bookmark"
        >
          <Bookmark className="h-[18px] w-[18px]" />
        </button>
      </div>
    </Link>
  );
}
