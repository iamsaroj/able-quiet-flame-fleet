import { useEffect, useRef, useState } from "react";
import { buildSrcdoc } from "@/lib/sandbox";
import type { Files } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

type Tab = "html" | "css" | "js";

export function SandboxEditor({
  files,
  onChange,
  mode,
  className,
}: {
  files: Files;
  onChange: (next: Files) => void;
  mode: "web" | "react";
  className?: string;
}) {
  const tabs: { id: Tab; label: string }[] =
    mode === "react"
      ? [
          { id: "html", label: "JSX" },
          { id: "css", label: "CSS" },
        ]
      : [
          { id: "html", label: "HTML" },
          { id: "css", label: "CSS" },
          { id: "js", label: "JS" },
        ];

  const [tab, setTab] = useState<Tab>("html");
  const [srcdoc, setSrcdoc] = useState("");
  const primed = useRef(false);

  useEffect(() => {
    if (mode === "react" && tab === "js") setTab("html");
  }, [mode, tab]);

  useEffect(() => {
    const delay = primed.current ? 280 : 0;
    const handle = window.setTimeout(() => {
      primed.current = true;
      setSrcdoc(buildSrcdoc(mode, files));
    }, delay);
    return () => window.clearTimeout(handle);
  }, [files, mode]);

  const value = files[tab];

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-lg bg-inset shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-1 border-b border-line px-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "h-10 px-3 font-mono text-xs uppercase tracking-wide",
              tab === t.id ? "text-fg" : "text-subtle hover:text-muted",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <label className="sr-only" htmlFor="kiln-editor">
        Lesson code
      </label>
      <textarea
        id="kiln-editor"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange({ ...files, [tab]: e.target.value })}
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          e.preventDefault();
          const el = e.currentTarget;
          const start = el.selectionStart;
          const end = el.selectionEnd;
          const next = value.slice(0, start) + "  " + value.slice(end);
          onChange({ ...files, [tab]: next });
          requestAnimationFrame(() => {
            el.selectionStart = el.selectionEnd = start + 2;
          });
        }}
        className="h-48 w-full shrink-0 resize-none overflow-auto bg-transparent p-3 font-mono text-xs leading-5 text-fg outline-none lg:h-auto lg:min-h-44 lg:flex-1"
      />
      <div className="min-h-48 flex-1 border-t border-line bg-paper">
        <iframe
          title="Lesson preview"
          sandbox="allow-scripts"
          srcDoc={srcdoc}
          className="h-full min-h-48 w-full bg-paper"
        />
      </div>
    </div>
  );
}
