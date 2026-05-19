import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Join IntelFeed — Know what they never told you" },
      { name: "description", content: "Verified, time-sensitive college intel from seniors. Join free with your college email." },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const [role, setRole] = useState<"fresher" | "senior" | null>("fresher");

  return (
    <div className="grid min-h-screen grid-cols-2">
      {/* LEFT */}
      <div className="relative flex flex-col justify-between p-12 overflow-hidden" style={{ background: "var(--color-sidebar)" }}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15">
            <Zap className="h-4 w-4 text-primary" strokeWidth={2.5} />
          </div>
          <span className="text-[16px] font-extrabold text-primary">IntelFeed</span>
        </div>

        {/* Abstract geometric illustration */}
        <svg viewBox="0 0 500 500" className="absolute inset-0 m-auto h-[80%] w-[80%] opacity-90" aria-hidden>
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="250" cy="250" r="220" fill="url(#g1)" />
          {/* connecting lines */}
          <g stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1">
            <line x1="120" y1="140" x2="250" y2="250" />
            <line x1="380" y1="120" x2="250" y2="250" />
            <line x1="100" y1="360" x2="250" y2="250" />
            <line x1="400" y1="380" x2="250" y2="250" />
            <line x1="250" y1="60" x2="250" y2="250" />
            <line x1="250" y1="440" x2="250" y2="250" />
            <line x1="120" y1="140" x2="380" y2="120" />
            <line x1="100" y1="360" x2="400" y2="380" />
          </g>
          {/* nodes */}
          <g fill="#38BDF8">
            <circle cx="120" cy="140" r="8" />
            <circle cx="380" cy="120" r="10" />
            <circle cx="100" cy="360" r="6" />
            <circle cx="400" cy="380" r="12" />
            <circle cx="250" cy="60" r="7" />
            <circle cx="250" cy="440" r="9" />
            <circle cx="250" cy="250" r="18" />
          </g>
          {/* outer rings */}
          <circle cx="250" cy="250" r="120" fill="none" stroke="#38BDF8" strokeOpacity="0.25" />
          <circle cx="250" cy="250" r="180" fill="none" stroke="#38BDF8" strokeOpacity="0.15" />
        </svg>

        <div className="relative z-10 max-w-md">
          <h1 className="text-[40px] font-extrabold leading-[1.05] text-white">
            Know what they never told you.
          </h1>
          <p className="mt-4 text-[15px] text-white/70 leading-relaxed">
            Real intel from seniors. Verified. Time-sensitive. Free.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-white px-12">
        <div className="w-full max-w-[420px]">
          <h2 className="text-[24px] font-bold text-foreground">Join IntelFeed</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Use your college email — we verify privately.</p>

          <div className="mt-7">
            <label className="label-eyebrow">College email</label>
            <input
              type="email"
              placeholder="you@iitm.ac.in"
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>

          <div className="mt-6">
            <label className="label-eyebrow">I am a</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {(["fresher", "senior"] as const).map((r) => {
                const active = role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className="card-base flex flex-col items-start gap-2 p-4 text-left transition-all"
                    style={{
                      borderColor: active ? "var(--color-primary)" : undefined,
                      boxShadow: active ? "0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent)" : undefined,
                    }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[14px] font-bold"
                      style={{
                        background: active ? "color-mix(in oklab, var(--color-primary) 15%, white)" : "var(--color-muted)",
                        color: active ? "var(--color-primary-dark)" : "var(--color-muted-foreground)",
                      }}
                    >
                      {r === "fresher" ? "1st" : "Sr"}
                    </span>
                    <span className="text-[14px] font-semibold text-foreground">
                      I am a {r === "fresher" ? "Fresher" : "Senior"}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {r === "fresher" ? "Reading & saving intel" : "Submitting & verifying intel"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            to="/feed"
            className="mt-7 block w-full rounded-xl py-3 text-center text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--color-primary)" }}
          >
            Continue
          </Link>

          <button className="mt-3 w-full text-center text-[12px] text-muted-foreground hover:text-foreground">
            How we verify your identity
          </button>
        </div>
      </div>
    </div>
  );
}
