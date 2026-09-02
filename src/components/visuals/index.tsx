import type { VisualId } from "@/lib/curriculum/types";
import { TagAnatomy } from "./tag-anatomy";
import { BoxModelLab } from "./box-model";
import { FlexLab } from "./flex-lab";
import { GridLab } from "./grid-lab";
import { Cascade } from "./cascade";
import { DomTalk } from "./dom-talk";
import { StateLoop } from "./state-loop";
import { ComponentTree } from "./component-tree";

export function LessonVisual({ id }: { id: VisualId }) {
  switch (id) {
    case "tag-anatomy":
      return <TagAnatomy />;
    case "box-model":
      return <BoxModelLab />;
    case "flex-lab":
      return <FlexLab />;
    case "grid-lab":
      return <GridLab />;
    case "cascade":
      return <Cascade />;
    case "dom-talk":
      return <DomTalk />;
    case "state-loop":
      return <StateLoop />;
    case "component-tree":
      return <ComponentTree />;
  }
}
