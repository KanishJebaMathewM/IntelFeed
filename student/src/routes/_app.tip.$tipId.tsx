import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { CategoryBadge, PlainBadge } from "@/components/ui-bits/CategoryBadge";
import { AvatarCircle } from "@/components/ui-bits/AvatarCircle";
import { tipById, tips, categoryMeta } from "@/data/mock";

export const Route = createFileRoute("/_app/tip/$tipId")({
  head: ({ params }) => {
    const t = tipById(params.tipId);
    return { meta: [
      { title: `${t.title.slice(0, 50)}… — IntelFeed` },
      { name: "description", content: t.body.slice(0, 155) },
    ]};
  },
  component: TipDetail,
});

function TipDetail() {
  const { tipId } = Route.useParams();
  const tip = tipById(tipId);
  const similar = tips.filter((t) => t.id !== tip.id).slice(0, 2);

  return (
    <>
      {/* breadcrumb */}
      <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
        <Link to="/feed" className="hover:text-primary">Feed</Link>
        <ChevronRight className="h-3 w-3" />
        <span>{categoryMeta[tip.category].label}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Tip detail</span>
      </div>

      <div className="mt-6 grid grid-cols-[740px_380px] gap-6">
        {/* LEFT */}
        <div className="card-base p-7">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={tip.category} />
            <PlainBadge tone="yellow">{tip.dept}</PlainBadge>
            <PlainBadge tone="muted">{tip.college}</PlainBadge>
          </div>

          <h1 className="mt-5 text-[20px] font-bold leading-snug text-foreground">{tip.title}</h1>
          <p className="mt-4 text-[15px] leading-7 text-foreground/85">{tip.body}</p>

          <div className="my-7 h-px bg-border" />

          <h3 className="text-[15px] font-semibold text-foreground">Why trust this?</h3>
          <div className="mt-4 space-y-4">
            {tip.verifiers.map((v) => (
              <div key={v.id} className="flex items-start gap-3">
                <AvatarCircle initials={v.initials} size={36} />
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-foreground">{v.name}</div>
                  <div className="text-[11px] text-muted-foreground">Senior · {v.dept} {v.year}</div>
                  {v.note && <p className="mt-1 text-[13px] italic text-muted-foreground">"{v.note}"</p>}
                </div>
                <CheckCircle2 className="h-5 w-5 text-mint" />
              </div>
            ))}
          </div>

          {/* conflict card */}
          <div className="mt-7 grid grid-cols-2 gap-0 overflow-hidden rounded-xl border border-border">
            <div className="p-5" style={{ background: "var(--color-mint-soft)" }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-mint" />
                <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "oklch(0.45 0.1 165)" }}>Confirmed version</span>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-foreground">3 seniors confirmed the late-edit email path works as described.</p>
            </div>
            <div className="p-5" style={{ background: "var(--color-coral-soft)" }}>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold uppercase tracking-wider text-coral">Disputed version</span>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-foreground">1 senior says the window closed for 2025 — confirm directly with the office.</p>
            </div>
          </div>

          {/* actions */}
          <div className="mt-7 flex items-center gap-3">
            <button className="rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white hover:opacity-90" style={{ background: "var(--color-primary)" }}>
              Save to deadline tracker
            </button>
            <button className="rounded-xl border border-primary px-5 py-2.5 text-[13px] font-semibold text-primary hover:bg-primary/5">
              Share tip
            </button>
            <button className="ml-auto text-[12px] text-muted-foreground hover:text-foreground">Not relevant</button>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="sticky top-8 self-start space-y-4">
          <div className="card-base p-5">
            <h3 className="text-[15px] font-semibold text-foreground">About this tip</h3>
            <dl className="mt-4 space-y-3 text-[13px]">
              {[
                ["Category", categoryMeta[tip.category].label],
                ["Department", tip.dept],
                ["Submitted", tip.submittedAgo],
                ["Deadline", tip.deadline ?? "—"],
                ["Verification", `${tip.verifiers.length} seniors`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card-base p-5">
            <h3 className="text-[15px] font-semibold text-foreground">Similar intel</h3>
            <ul className="mt-3 space-y-3">
              {similar.map((t) => (
                <li key={t.id}>
                  <Link to="/tip/$tipId" params={{ tipId: t.id }} className="block rounded-lg p-3 hover:bg-[color-mix(in_oklab,var(--color-primary)_6%,white)]">
                    <CategoryBadge category={t.category} size="xs" />
                    <p className="mt-2 text-[13px] font-medium text-foreground line-clamp-2">{t.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
