import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  lang,
  caption,
}: {
  code: string;
  lang: string;
  caption?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <figure className="overflow-hidden rounded-md bg-inset shadow-[var(--shadow-border)]">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-subtle">{lang}</span>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-sm text-muted hover:text-fg"
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
          }}
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5 text-ok" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre className={cn("overflow-x-auto p-3 font-mono text-[12px] leading-5 text-fg")}>
        <code>{code}</code>
      </pre>
      {caption ? <figcaption className="border-t border-line px-3 py-2 text-xs text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
