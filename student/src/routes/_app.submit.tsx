import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, ChevronDown } from "lucide-react";
import { CategoryBadge } from "@/components/ui-bits/CategoryBadge";
import { AvatarCircle } from "@/components/ui-bits/AvatarCircle";
import { user, type Category } from "@/data/mock";

export const Route = createFileRoute("/_app/submit")({
  head: () => ({ meta: [{ title: "Submit a tip — IntelFeed" }] }),
  component: SubmitPage,
});

function SubmitPage() {
  const [anon, setAnon] = useState(false);
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<Category>("scholarship");
  const [dept, setDept] = useState("CSE");
  const [deadline, setDeadline] = useState("");

  return (
    <div className="grid grid-cols-[1fr_360px] gap-8">
      <div className="max-w-[720px]">
        <h1 className="text-[26px] font-bold text-foreground">Share what you know</h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          Help the batch below you — your intel could change someone's semester.
        </p>

        {/* anon toggle */}
        <div className="mt-7 flex items-center justify-between rounded-xl border border-border bg-white px-5 py-4">
          <div>
            <div className="text-[14px] font-medium text-foreground">Post anonymously</div>
            <div className="mt-0.5 text-[12px] text-muted-foreground">Your college email is still verified internally.</div>
          </div>
          <button
            onClick={() => setAnon((v) => !v)}
            className="relative h-7 w-12 rounded-full transition-colors"
            style={{ background: anon ? "var(--color-primary)" : "var(--color-border)" }}
            aria-pressed={anon}
          >
            <span
              className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all"
              style={{ left: anon ? "22px" : "2px" }}
            />
          </button>
        </div>

        <div className="mt-7 space-y-6">
          <div>
            <label className="label-eyebrow">What's the intel?</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              placeholder="e.g. Prof. Iyer always has one question from the last tutorial sheet — verbatim."
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] leading-relaxed outline-none placeholder:italic placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Dropdown label="Category" value={categoryMetaLabel(category)} onChange={() => {}}>
              {(["scholarship","club","exam","internship","dept","office"] as Category[]).map((c) => (
                <button key={c} onClick={() => setCategory(c)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-muted">
                  <CategoryBadge category={c} size="xs" />
                </button>
              ))}
            </Dropdown>
            <Dropdown label="Department" value={dept} onChange={() => {}}>
              {["CSE","ECE","Mech","Civil","Chemical","All Depts"].map((d) => (
                <button key={d} onClick={() => setDept(d)} className="block w-full px-3 py-2 text-left text-[13px] hover:bg-muted">{d}</button>
              ))}
            </Dropdown>
          </div>

          <div>
            <label className="label-eyebrow">Deadline date</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>

          <div>
            <label className="label-eyebrow">How do you know this?</label>
            <textarea
              rows={3}
              placeholder="e.g. I sat in his class last semester and saw three friends rely on it."
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] outline-none placeholder:italic placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>
        </div>

        <p className="mt-7 text-center text-[12px] text-muted-foreground">
          3 peers from your branch will verify this before it goes live.
        </p>
        <button className="mt-3 w-full rounded-xl py-3.5 text-[14px] font-semibold text-white hover:opacity-90" style={{ background: "var(--color-primary)" }}>
          Submit for verification
        </button>
      </div>

      {/* Live preview */}
      <aside className="sticky top-8 self-start">
        <div className="label-eyebrow mb-3">Live preview</div>
        <div className="card-base p-5">
          <div className="flex items-center justify-between">
            <CategoryBadge category={category} />
            <span className="text-[11px] text-muted-foreground">just now</span>
          </div>
          <p className="mt-3 text-[14px] font-medium leading-snug text-foreground">
            {body || "Your tip will appear here as you type…"}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {anon ? (
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">?</div>
              ) : (
                <AvatarCircle initials={user.initials} size={22} />
              )}
              <span className="text-[11px] text-muted-foreground">
                {anon ? "Anonymous" : user.name} · {dept}
              </span>
            </div>
            <Bookmark className="h-[16px] w-[16px] text-primary" />
          </div>
        </div>
      </aside>
    </div>
  );
}

function categoryMetaLabel(c: Category) {
  return ({
    scholarship: "Scholarship", club: "Club", exam: "Exam",
    internship: "Internship", dept: "Dept Norms", office: "Office Hours",
  } as const)[c];
}

function Dropdown({ label, value, children }: { label: string; value: string; onChange: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <label className="label-eyebrow">{label}</label>
      <div className="relative mt-2">
        <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-left text-[14px] hover:border-primary/50">
          <span className="text-foreground">{value}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        {open && (
          <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-white py-1 shadow-lg">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
