export function DomTalk() {
  return (
    <figure className="rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]">
      <figcaption className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        The tree the browser built
      </figcaption>
      <pre className="font-mono text-xs leading-6 text-muted">
        <span className="text-subtle">document</span>
        {"\n"}└─ <span className="text-fg">html</span>
        {"\n"}&nbsp;&nbsp;&nbsp;├─ <span className="text-subtle">head</span>
        {"\n"}&nbsp;&nbsp;&nbsp;└─ <span className="text-fg">body</span>
        {"\n"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ <span className="text-accent">main</span>
        {"\n"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ <span className="text-fg">h1</span>
        {"  "}<span className="text-subtle">“Closed”</span>
        {"\n"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ <span className="text-fg">p</span>
        {"   "}<span className="text-subtle">querySelector finds these</span>
      </pre>
      <p className="mt-3 text-xs text-subtle">
        JavaScript does not edit the file. It walks this tree and mutates nodes.
      </p>
    </figure>
  );
}
