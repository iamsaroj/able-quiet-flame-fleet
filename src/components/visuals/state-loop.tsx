const STEPS = [
  { n: "01", t: "Event", d: "Click. onClick fires." },
  { n: "02", t: "Setter", d: "setCount(count + 1). A request, not an assignment." },
  { n: "03", t: "Render", d: "The function runs again with the new state." },
  { n: "04", t: "Commit", d: "React writes the new tree to the DOM." },
];

export function StateLoop() {
  return (
    <figure className="rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]">
      <figcaption className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        The render loop
      </figcaption>
      <ol className="grid gap-2 sm:grid-cols-2">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-md bg-raised px-3 py-2.5">
            <p className="font-mono text-[11px] text-accent">{s.n}</p>
            <p className="text-sm text-fg">{s.t}</p>
            <p className="text-xs text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
