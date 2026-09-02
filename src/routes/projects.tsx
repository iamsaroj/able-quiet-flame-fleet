import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLesson, PROJECT_IDS, TRACK_LABEL } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/projects")({ component: ProjectsPage });

const COPY: Record<string, { name: string; pitch: string }> = {
  "html-project": {
    name: "Calling card",
    pitch: "A personal page with landmarks, a work list, and a real form. Structure before skin.",
  },
  "css-project": {
    name: "Harbor",
    pitch: "A restaurant landing: flex header, type system, wrapping menu grid. Portfolio piece one.",
  },
  "js-project": {
    name: "Ticket board",
    pitch: "Add, toggle, delete. An array is the source of truth. Most “apps” are this shape.",
  },
  "react-project": {
    name: "Studio board",
    pitch: "The ticket board, rewritten in React: filter, form, immutable updates. You are a frontend developer.",
  },
};

function ProjectsPage() {
  const completed = useProgress((s) => s.completed);
  const done = new Set(completed);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-subtle">Portfolio</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Four ships</h1>
      <p className="mt-3 max-w-lg text-[15px] leading-7 text-muted">
        These are the weeks you show someone. Each one is a complete lesson with a brief, a bench,
        and a solution if you get stuck. Do them in order if you can.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {PROJECT_IDS.map((pid, i) => {
          const lesson = getLesson(pid);
          if (!lesson) return null;
          const meta = COPY[pid];
          const isDone = done.has(pid);
          return (
            <li key={pid} className="flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  0{i + 1} · {TRACK_LABEL[lesson.track]}
                </p>
                {isDone ? (
                  <span className="flex items-center gap-1 font-mono text-[11px] text-ok">
                    <Check className="size-3.5" /> Shipped
                  </span>
                ) : (
                  <span className="font-mono text-[11px] text-subtle">Week {lesson.week}</span>
                )}
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight">{meta.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">{meta.pitch}</p>
              <Button asChild className="mt-6 self-start" size="sm">
                <Link to="/lesson/$id" params={{ id: pid }}>
                  Open the bench
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
