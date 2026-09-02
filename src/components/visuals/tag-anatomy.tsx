const PARTS = [
  { id: "open", label: "Opening tag", sample: "<h1>", note: "The name of the element. Attributes live here." },
  { id: "content", label: "Content", sample: "Harbor", note: "What the visitor reads. Can be text or nested tags." },
  { id: "close", label: "Closing tag", sample: "</h1>", note: "Same name, with a slash. Turns the element off." },
] as const;

export function TagAnatomy() {
  return (
    <figure className="rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]">
      <figcaption className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        Anatomy of a tag
      </figcaption>
      <div className="flex flex-wrap items-center gap-1 font-mono text-sm">
        <span className="rounded-sm bg-raised px-2 py-1 text-accent">{PARTS[0].sample}</span>
        <span className="rounded-sm bg-paper px-2 py-1 text-paper-fg">{PARTS[1].sample}</span>
        <span className="rounded-sm bg-raised px-2 py-1 text-accent">{PARTS[2].sample}</span>
      </div>
      <ol className="mt-4 space-y-2">
        {PARTS.map((p, i) => (
          <li key={p.id} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-sm">
            <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-fg">{p.label}</span>
            <span />
            <span className="text-muted">{p.note}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
