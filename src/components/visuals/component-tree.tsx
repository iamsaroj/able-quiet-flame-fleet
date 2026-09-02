export function ComponentTree() {
  return (
    <figure className="rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]">
      <figcaption className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        A page is a tree of functions
      </figcaption>
      <ul className="space-y-1.5 font-mono text-sm">
        <li className="text-accent">App()</li>
        <li className="pl-4 text-fg">Header()</li>
        <li className="pl-8 text-muted">{"<p>Harbor</p>"}</li>
        <li className="pl-4 text-fg">Main()</li>
        <li className="pl-8 text-muted">{"<h1/>"}</li>
        <li className="pl-4 text-fg">Footer()</li>
      </ul>
      <p className="mt-3 text-xs text-subtle">
        Each function returns a description. React turns the description into DOM.
      </p>
    </figure>
  );
}
