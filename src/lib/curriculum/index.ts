import type { Lesson, TrackId, WeekMeta } from "./types";
import { htmlLessons } from "./html";
import { cssLessons } from "./css";
import { jsLessons } from "./js";
import { reactLessons } from "./react";

export const TRACKS: { id: TrackId; label: string; weeks: string; blurb: string }[] = [
  {
    id: "html",
    label: "HTML",
    weeks: "Weeks 1–2",
    blurb: "Meaning. Landmarks, text, forms. A calling card with bones.",
  },
  {
    id: "css",
    label: "CSS",
    weeks: "Weeks 3–4",
    blurb: "Skin. Cascade, box, type, flex, grid. A restaurant you could open.",
  },
  {
    id: "js",
    label: "JavaScript",
    weeks: "Weeks 5–6",
    blurb: "Behavior. The DOM, events, data as source of truth. A ticket board.",
  },
  {
    id: "react",
    label: "React",
    weeks: "Weeks 7–8",
    blurb: "Components. Props, state, lists, effects. A studio app.",
  },
];

export const WEEKS: WeekMeta[] = [
  {
    week: 1,
    track: "html",
    title: "The document",
    hours: "5–7 hrs",
    ship: "A page, a recipe, a profile",
    blurb: "Tags, hierarchy, links. You stop treating HTML as a styling language.",
  },
  {
    week: 2,
    track: "html",
    title: "The map",
    hours: "5–7 hrs",
    ship: "Calling card site",
    blurb: "Landmarks and forms. You ship a personal page with nothing but meaning.",
  },
  {
    week: 3,
    track: "css",
    title: "The box",
    hours: "6–8 hrs",
    ship: "A card, an article",
    blurb: "Cascade, box model, type. Pages start to look considered.",
  },
  {
    week: 4,
    track: "css",
    title: "The layout",
    hours: "6–8 hrs",
    ship: "Harbor landing",
    blurb: "Flex and grid. A restaurant page that holds at 400px and at 1000px.",
  },
  {
    week: 5,
    track: "js",
    title: "The nerves",
    hours: "6–8 hrs",
    ship: "A live check, a rewritten heading",
    blurb: "Values, functions, the DOM. The page is no longer static.",
  },
  {
    week: 6,
    track: "js",
    title: "The app",
    hours: "6–8 hrs",
    ship: "Ticket board",
    blurb: "Events and arrays. UI becomes a function of state — in vanilla JS.",
  },
  {
    week: 7,
    track: "react",
    title: "The tree",
    hours: "6–8 hrs",
    ship: "Components with state",
    blurb: "Function components, props, useState. The ticket board’s idea, named.",
  },
  {
    week: 8,
    track: "react",
    title: "The studio",
    hours: "6–8 hrs",
    ship: "Studio board",
    blurb: "Lists, forms, effects. You leave with a React app you built yourself.",
  },
];

export const LESSONS: Lesson[] = [...htmlLessons, ...cssLessons, ...jsLessons, ...reactLessons];

export const PROJECT_IDS = ["html-project", "css-project", "js-project", "react-project"] as const;

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getLessonIndex(id: string): number {
  return LESSONS.findIndex((l) => l.id === id);
}

export function getAdjacent(id: string): { prev?: Lesson; next?: Lesson } {
  const i = getLessonIndex(id);
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

export function lessonsForWeek(week: number): Lesson[] {
  return LESSONS.filter((l) => l.week === week);
}

export function lessonsForTrack(track: TrackId): Lesson[] {
  return LESSONS.filter((l) => l.track === track);
}

export function isProject(id: string): boolean {
  return (PROJECT_IDS as readonly string[]).includes(id);
}

export const TRACK_LABEL: Record<TrackId, string> = {
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  react: "React",
};
