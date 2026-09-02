import { AlertCircle, Bookmark, Lightbulb } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { LessonVisual } from "@/components/visuals";
import type { Block } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

const CALLOUT = {
  rule: { icon: Bookmark, label: "Rule", className: "border-accent/30" },
  pitfall: { icon: AlertCircle, label: "Pitfall", className: "border-danger/40" },
  why: { icon: Lightbulb, label: "Why", className: "border-line-strong" },
} as const;

export function LessonBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i} className="text-[15px] leading-7 text-fg/90">
              {block.text}
            </p>
          );
        }
        if (block.type === "h") {
          return (
            <h3 key={i} className="font-serif text-2xl tracking-tight text-fg">
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2 pl-0">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-fg/90">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "code") {
          return <CodeBlock key={i} code={block.code} lang={block.lang} caption={block.caption} />;
        }
        if (block.type === "callout") {
          const meta = CALLOUT[block.kind];
          const Icon = meta.icon;
          return (
            <aside
              key={i}
              className={cn("rounded-md border bg-raised/60 px-4 py-3", meta.className)}
            >
              <p className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                <Icon className="size-3.5" />
                {meta.label}
              </p>
              <p className="text-sm font-medium text-fg">{block.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{block.text}</p>
            </aside>
          );
        }
        if (block.type === "visual") {
          return <LessonVisual key={i} id={block.id} />;
        }
        if (block.type === "steps") {
          return (
            <ol key={i} className="space-y-3">
              {block.items.map((step, n) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-3">
                  <span className="font-mono text-xs tabular-nums text-accent">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-fg">{step.title}</p>
                    <p className="text-sm leading-6 text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          );
        }
        return null;
      })}
    </div>
  );
}
