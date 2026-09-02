import { useState } from "react";

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-muted">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-sm bg-raised text-fg hover:bg-line-strong"
          onClick={() => onChange(Math.max(0, value - 4))}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-10 text-center font-mono text-sm tabular-nums">{value}</span>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-sm bg-raised text-fg hover:bg-line-strong"
          onClick={() => onChange(Math.min(48, value + 4))}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function BoxModelLab() {
  const [margin, setMargin] = useState(16);
  const [padding, setPadding] = useState(16);
  const [border, setBorder] = useState(4);

  return (
    <figure className="rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]">
      <figcaption className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        Box model — drag the layers
      </figcaption>
      <div className="grid gap-5 sm:grid-cols-[1fr_11rem]">
        <div className="flex items-center justify-center py-2">
          <div
            className="bg-faint/40"
            style={{ padding: margin }}
            title="margin"
          >
            <div
              className="bg-muted/40"
              style={{ padding: border }}
              title="border"
            >
              <div
                className="bg-accent/30"
                style={{ padding }}
                title="padding"
              >
                <div className="bg-paper px-4 py-3 text-center font-mono text-xs text-paper-fg">
                  content
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Stepper label="Margin" value={margin} onChange={setMargin} />
          <Stepper label="Border" value={border} onChange={setBorder} />
          <Stepper label="Padding" value={padding} onChange={setPadding} />
          <p className="text-xs text-subtle">
            Width with <span className="font-mono">border-box</span> stays put.
            Margin still sits outside.
          </p>
        </div>
      </div>
    </figure>
  );
}
