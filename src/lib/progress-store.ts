import { create } from "zustand";
import type { Files } from "@/lib/curriculum/types";

const KEY = "kiln-progress-v1";

type Drafts = Record<string, Files>;

type ProgressState = {
  hydrated: boolean;
  completed: string[];
  drafts: Drafts;
  lastId: string | null;
  hydrate: () => void;
  markComplete: (id: string) => void;
  saveDraft: (id: string, files: Files) => void;
  setLast: (id: string) => void;
  resetAll: () => void;
};

type Snapshot = {
  completed: string[];
  drafts: Drafts;
  lastId: string | null;
};

function readSnapshot(): Snapshot {
  if (typeof window === "undefined") {
    return { completed: [], drafts: {}, lastId: null };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [], drafts: {}, lastId: null };
    const parsed = JSON.parse(raw) as Partial<Snapshot>;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
      lastId: typeof parsed.lastId === "string" ? parsed.lastId : null,
    };
  } catch {
    return { completed: [], drafts: {}, lastId: null };
  }
}

function writeSnapshot(state: Snapshot) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    KEY,
    JSON.stringify({
      completed: state.completed,
      drafts: state.drafts,
      lastId: state.lastId,
    }),
  );
}

export const useProgress = create<ProgressState>((set, get) => ({
  hydrated: false,
  completed: [],
  drafts: {},
  lastId: null,
  hydrate: () => {
    const snap = readSnapshot();
    set({ ...snap, hydrated: true });
  },
  markComplete: (id) => {
    const { completed, drafts, lastId } = get();
    const next = completed.includes(id) ? completed : [...completed, id];
    const snap = { completed: next, drafts, lastId: id };
    writeSnapshot(snap);
    set({ completed: next, lastId: id });
  },
  saveDraft: (id, files) => {
    const { completed, drafts, lastId } = get();
    const nextDrafts = { ...drafts, [id]: files };
    writeSnapshot({ completed, drafts: nextDrafts, lastId });
    set({ drafts: nextDrafts });
  },
  setLast: (id) => {
    const { completed, drafts } = get();
    writeSnapshot({ completed, drafts, lastId: id });
    set({ lastId: id });
  },
  resetAll: () => {
    const snap = { completed: [], drafts: {}, lastId: null };
    writeSnapshot(snap);
    set(snap);
  },
}));
