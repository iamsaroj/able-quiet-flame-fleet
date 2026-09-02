import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RotateCcw, Check } from "lucide-react";
import { LessonBlocks } from "@/components/lesson-blocks";
import { SandboxEditor } from "@/components/sandbox-editor";
import { Button } from "@/components/ui/button";
import { getAdjacent, getLesson, LESSONS, TRACK_LABEL } from "@/lib/curriculum";
import { makeCtx } from "@/lib/curriculum/checks";
import type { Files } from "@/lib/curriculum/types";
import { useProgress } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson/$id")({
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useParams();
  const lesson = getLesson(id);

  if (!lesson) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">That lesson is not on the path.</h1>
        <Button asChild className="mt-6">
          <Link to="/path">Back to the syllabus</Link>
        </Button>
      </main>
    );
  }

  return <LessonBench id={id} />;
}

function LessonBench({ id }: { id: string }) {
  const lesson = getLesson(id)!;
  const { prev, next } = getAdjacent(id);
  const navigate = useNavigate();
  const saveDraft = useProgress((s) => s.saveDraft);
  const markComplete = useProgress((s) => s.markComplete);
  const setLast = useProgress((s) => s.setLast);
  const drafts = useProgress((s) => s.drafts);
  const completed = useProgress((s) => s.completed);
  const isDone = completed.includes(id);

  const [files, setFiles] = useState<Files>(drafts[id] ?? lesson.files);
  const [pane, setPane] = useState<"learn" | "build">("learn");
  const [showSolution, setShowSolution] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setFiles(useProgress.getState().drafts[id] ?? lesson.files);
    setShowSolution(false);
    setChecked(false);
    setPane("learn");
    setLast(id);
  }, [id, lesson.files, setLast]);

  useEffect(() => {
    const t = window.setTimeout(() => saveDraft(id, files), 450);
    return () => window.clearTimeout(t);
  }, [files, id, saveDraft]);

  const results = useMemo(() => {
    const ctx = makeCtx(files);
    return lesson.challenge.checks.map((c) => ({
      ...c,
      pass: (() => {
        try {
          return c.run(ctx);
        } catch {
          return false;
        }
      })(),
    }));
  }, [files, lesson.challenge.checks]);

  const passed = results.filter((r) => r.pass).length;
  const allPass = passed === results.length && results.length > 0;

  function completeAndNext() {
    markComplete(id);
    if (next) {
      void navigate({ to: "/lesson/$id", params: { id: next.id } });
    } else {
      void navigate({ to: "/path" });
    }
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col lg:h-[calc(100dvh-4rem)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-4 py-3 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Week {lesson.week} · {TRACK_LABEL[lesson.track]}
          {isDone ? " · Done" : ""}
        </p>
        <span className="hidden text-subtle sm:inline">·</span>
        <span className="font-mono text-[11px] tabular-nums text-subtle">
          {lesson.order}/{LESSONS.length} · {lesson.minutes}m
        </span>
        <div className="ml-auto flex items-center gap-2">
          {prev ? (
            <Button asChild variant="ghost" size="sm">
              <Link to="/lesson/$id" params={{ id: prev.id }}>
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Prev</span>
              </Link>
            </Button>
          ) : null}
          {next ? (
            <Button asChild variant="outline" size="sm">
              <Link to="/lesson/$id" params={{ id: next.id }}>
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="flex border-b border-line lg:hidden">
        {(["learn", "build"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPane(p)}
            className={cn(
              "h-12 flex-1 text-sm font-medium capitalize",
              pane === p ? "text-fg" : "text-muted",
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <section
          className={cn(
            "min-h-0 overflow-y-auto px-4 py-6 sm:px-6",
            pane === "build" ? "hidden lg:block" : "block",
          )}
        >
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">{lesson.title}</h1>
          <p className="mt-2 text-muted">{lesson.subtitle}</p>
          <p className="mt-4 text-sm text-fg">
            You ship: <span className="text-accent">{lesson.youShip}</span>
          </p>
          <ul className="mt-3 space-y-1">
            {lesson.youWill.map((w) => (
              <li key={w} className="flex gap-2 text-sm text-muted">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-faint" />
                {w}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <LessonBlocks blocks={lesson.blocks} />
          </div>

          <div className="mt-10 rounded-lg bg-raised px-4 py-4 shadow-[var(--shadow-border)]">
            <h2 className="text-sm font-medium text-fg">The work</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{lesson.challenge.brief}</p>
            <ol className="mt-4 space-y-2">
              {results.map((r) => (
                <li key={r.id} className="flex gap-3 text-sm">
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                      r.pass ? "bg-ok/20 text-ok" : "bg-inset text-subtle",
                    )}
                  >
                    {r.pass ? <Check className="size-3" /> : <span className="size-1.5 rounded-full bg-faint" />}
                  </span>
                  <span>
                    <span className={r.pass ? "text-fg" : "text-muted"}>{r.label}</span>
                    {!r.pass ? <span className="mt-0.5 block text-xs text-subtle">{r.hint}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-3 font-mono text-[11px] tabular-nums text-subtle">
              {passed}/{results.length} checks
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                disabled={!allPass && !isDone}
                onClick={completeAndNext}
              >
                {next ? "Complete & next" : "Complete the path"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  markComplete(id);
                  setChecked(true);
                }}
              >
                Mark done anyway
              </Button>
            </div>
            {checked && !allPass ? (
              <p className="mt-2 text-xs text-subtle">
                Recorded. Come back and finish the checks when you want.
              </p>
            ) : null}
          </div>
        </section>

        <section
          className={cn(
            "flex min-h-0 flex-col border-line lg:border-l",
            pane === "learn" ? "hidden lg:flex" : "flex",
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
            <p className="font-mono text-[11px] uppercase tracking-wide text-subtle">Bench</p>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setFiles(lesson.files)}
              >
                <RotateCcw className="size-3.5" />
                Reset
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowSolution((v) => !v)}>
                {showSolution ? "Hide solution" : "Show solution"}
              </Button>
            </div>
          </div>
          {showSolution ? (
            <div className="border-b border-line bg-raised px-3 py-3">
              <p className="mb-2 text-xs text-muted">
                A finished version. Copy it only after you have tried — this is a workshop, not an
                answer key class.
              </p>
              <Button size="sm" variant="outline" onClick={() => setFiles(lesson.solution)}>
                Load solution onto the bench
              </Button>
            </div>
          ) : null}
          <SandboxEditor
            files={files}
            onChange={setFiles}
            mode={lesson.mode}
            className="min-h-[28rem] flex-1 rounded-none shadow-none"
          />
        </section>
      </div>
    </div>
  );
}
