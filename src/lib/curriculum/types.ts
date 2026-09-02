export type TrackId = "html" | "css" | "js" | "react";

export type VisualId =
  | "tag-anatomy"
  | "box-model"
  | "flex-lab"
  | "grid-lab"
  | "cascade"
  | "dom-talk"
  | "state-loop"
  | "component-tree";

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "callout"; kind: "rule" | "pitfall" | "why"; title: string; text: string }
  | { type: "code"; lang: "html" | "css" | "js" | "jsx"; code: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "visual"; id: VisualId }
  | { type: "steps"; items: { title: string; text: string }[] };

export type Files = {
  html: string;
  css: string;
  js: string;
};

export type CheckContext = {
  html: string;
  css: string;
  js: string;
  doc: Document;
};

export type Check = {
  id: string;
  label: string;
  hint: string;
  run: (ctx: CheckContext) => boolean;
};

export type Lesson = {
  id: string;
  week: number;
  order: number;
  track: TrackId;
  title: string;
  subtitle: string;
  minutes: number;
  youWill: string[];
  youShip: string;
  blocks: Block[];
  visual?: VisualId;
  files: Files;
  mode: "web" | "react";
  challenge: {
    brief: string;
    checks: Check[];
  };
  solution: Files;
};

export type WeekMeta = {
  week: number;
  track: TrackId;
  title: string;
  hours: string;
  ship: string;
  blurb: string;
};
