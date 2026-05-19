import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_app/search")({
  head: () => ({ meta: [{ title: "Search — IntelFeed" }] }),
  component: () => (
    <>
      <h1 className="text-[22px] font-bold text-foreground">Search</h1>
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3">
        <Search className="h-[18px] w-[18px] text-primary" />
        <input className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground" placeholder="Search tips, professors, clubs, deadlines…" />
      </div>
      <div className="mt-20 flex flex-col items-center text-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-primary/40">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="72" y1="72" x2="95" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className="mt-4 text-[13px] text-muted-foreground">Start typing to search verified intel from your seniors.</p>
      </div>
    </>
  ),
});
