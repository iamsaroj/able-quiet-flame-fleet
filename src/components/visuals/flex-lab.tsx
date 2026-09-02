import { useState } from "react";
import { cn } from "@/lib/utils";

const JUSTIFY = ["flex-start", "center", "space-between", "space-around"] as const;
const ALIGN = ["stretch", "center", "flex-end"] as const;

export function FlexLab() {
  const [justify, setJustify] = useState<(typeof JUSTIFY)[number]>("space-between");
  const [align, setAlign] = useState<(typeof ALIGN)[number]>("center");

  return (
    <figure className="rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]">
      <figcaption className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        Flex — one axis
      </figcaption>
      <div
        className="flex h-28 rounded-md bg-bg px-2 py-2 shadow-[var(--shadow-border)]"
        style={{ justifyContent: justify, alignItems: align, gap: 8 }}
      >
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="flex w-10 items-center justify-center rounded-sm bg-accent font-mono text-xs text-accent-fg"
            style={{ height: n === 2 ? 40 : 28 }}
          >
            {n}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {JUSTIFY.map((j) => (
          <button
            key={j}
            type="button"
            onClick={() => setJustify(j)}
            className={cn(
              "h-9 rounded-sm px-2.5 font-mono text-[11px]",
              justify === j ? "bg-paper text-paper-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {j}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {ALIGN.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAlign(a)}
            className={cn(
              "h-9 rounded-sm px-2.5 font-mono text-[11px]",
              align === a ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {a}
          </button>
        ))}
      </div>
    </figure>
  );
}
