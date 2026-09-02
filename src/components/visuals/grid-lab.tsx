import { useState } from "react";
import { cn } from "@/lib/utils";

export function GridLab() {
  const [cols, setCols] = useState(3);

  return (
    <figure className="rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]">
      <figcaption className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        Grid — two axes
      </figcaption>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="flex h-12 items-center justify-center rounded-sm bg-raised font-mono text-xs text-muted"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setCols(n)}
            className={cn(
              "h-9 rounded-sm px-3 font-mono text-[11px]",
              cols === n ? "bg-paper text-paper-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {n} col{n > 1 ? "s" : ""}
          </button>
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px] text-subtle">
        grid-template-columns: repeat({cols}, 1fr)
      </p>
    </figure>
  );
}
