export function AvatarCircle({ initials, size = 28, tone = "primary" }: { initials: string; size?: number; tone?: "primary" | "coral" | "mint" | "yellow" }) {
  const bg = {
    primary: "var(--color-primary)",
    coral:   "var(--color-coral)",
    mint:    "var(--color-mint)",
    yellow:  "var(--color-yellow)",
  }[tone];
  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold"
      style={{
        width: size, height: size, background: bg,
        color: "var(--color-primary-dark)",
        fontSize: Math.max(10, size * 0.38),
      }}
    >
      {initials}
    </div>
  );
}

export function AvatarStack({ items, max = 4 }: { items: { initials: string }[]; max?: number }) {
  const shown = items.slice(0, max);
  return (
    <div className="flex -space-x-2">
      {shown.map((v, i) => (
        <div key={i} className="ring-2 ring-white rounded-full">
          <AvatarCircle initials={v.initials} size={22} />
        </div>
      ))}
    </div>
  );
}
