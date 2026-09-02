import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LESSONS, TRACK_LABEL, WEEKS, isProject } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/path")({ component: PathPage });

function PathPage() {
  const completed = useProgress((s) => s.completed);
  const done = new Set(completed);
  const pct = Math.round((completed.length / LESSONS.length) * 100);
  const allDone = completed.length === LESSONS.length;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-subtle">Syllabus</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">The eight weeks</h1>
      <p className="mt-3 max-w-lg text-[15px] leading-7 text-muted">
        Linear on purpose. Jump around if you want — nothing is locked — but the path is written
        so each ship uses yesterday’s tools.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Progress value={pct} className="flex-1" />
        <span className="font-mono text-xs tabular-nums text-muted">
          {completed.length}/{LESSONS.length}
        </span>
      </div>

      {allDone ? (
        <aside className="mt-8 rounded-lg bg-raised px-5 py-5 shadow-[var(--shadow-border)]">
          <p className="font-serif text-2xl text-fg">You shipped the path.</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Calling card. Harbor. Ticket board. Studio board. That is a portfolio, not a
            certificate. Open the projects and pick the next site yourself.
          </p>
          <Button asChild className="mt-4" size="sm">
            <Link to="/projects">See what you built</Link>
          </Button>
        </aside>
      ) : null}

      <ol className="mt-12 space-y-12">
        {WEEKS.map((week) => {
          const items = LESSONS.filter((l) => l.week === week.week);
          const weekDone = items.filter((l) => done.has(l.id)).length;
          return (
            <li key={week.week}>
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    Week {week.week} · {TRACK_LABEL[week.track]}
                  </p>
                  <h2 className="mt-1 font-serif text-3xl tracking-tight">{week.title}</h2>
                  <p className="mt-1 text-sm text-muted">{week.blurb}</p>
                </div>
                <span className="font-mono text-xs tabular-nums text-subtle">
                  {weekDone}/{items.length}
                </span>
              </div>
              <ul className="divide-y divide-line border-y border-line">
                {items.map((lesson) => {
                  const isDone = done.has(lesson.id);
                  return (
                    <li key={lesson.id}>
                      <Link
                        to="/lesson/$id"
                        params={{ id: lesson.id }}
                        className="flex items-center gap-3 py-3.5 hover:bg-raised/40"
                      >
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-full",
                            isDone ? "bg-accent text-accent-fg" : "bg-raised text-subtle",
                          )}
                        >
                          {isDone ? (
                            <Check className="size-3.5" />
                          ) : (
                            <span className="font-mono text-[10px] tabular-nums">{lesson.order}</span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-fg">{lesson.title}</span>
                          <span className="block truncate text-xs text-muted">{lesson.subtitle}</span>
                        </span>
                        <span className="font-mono text-[11px] text-subtle">
                          {isProject(lesson.id) ? "Project" : `${lesson.minutes}m`}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
