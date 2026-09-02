const LAYERS = [
  { spec: "0-0-1", sel: "p", note: "Element. Default type." },
  { spec: "0-1-0", sel: ".lead", note: "Class. Everyday tool." },
  { spec: "0-1-1", sel: "article p", note: "Element + ancestor." },
  { spec: "1-0-0", sel: "#hero", note: "ID. Too specific — skip." },
];

export function Cascade() {
  return (
    <figure className="rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]">
      <figcaption className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        Specificity — who wins
      </figcaption>
      <ol className="space-y-2">
        {LAYERS.map((l, i) => (
          <li
            key={l.sel}
            className="flex items-center gap-3 rounded-md bg-raised px-3 py-2"
            style={{ marginLeft: i * 8 }}
          >
            <span className="w-12 font-mono text-[11px] tabular-nums text-accent">{l.spec}</span>
            <span className="font-mono text-sm text-fg">{l.sel}</span>
            <span className="ml-auto text-xs text-muted">{l.note}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-subtle">
        When two rules match, the higher tuple wins. Then source order. Avoid the last row.
      </p>
    </figure>
  );
}
