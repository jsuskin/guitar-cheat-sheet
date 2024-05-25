import { tuning, stringXPositions, fretMidpoints } from "@/constants";
import type { Note } from "@/types";
import { rotateArray as _rotateArray } from "@/util/helper-methods";
import { v4 as uuidv4 } from "uuid";

export const addDotToGroup =
  (group: any, note: Note, fillColor: string, translate: number) =>
  ([stringIdx, fretIdx]: number[]) => {
    const className = "active-fret";
    const coords = `${stringIdx}_${fretIdx}`;
    const id = `${className}__${coords}___${uuidv4()}`;
    const circle = group
      .circle(100)
      .fill(fillColor)
      .move(
        +stringXPositions[stringIdx] - 40 + translate,
        +fretMidpoints[fretIdx]
      )
      .attr({ id, class: className });

    // Add click handler to dot
    circle.click(function () {
      console.log("circle click");
      circle.remove();
    });

    // Add title to dot
    circle.element("title").words(`${note}__${coords}`);
  };

export const rotateArray = (
  arr: Set<Note>[],
  pivotIndex: number,
  pivotType: "open string" | "root note" = "open string"
) =>
  _rotateArray(
    arr.indexOf(
      arr[pivotType === "root note" ? pivotIndex : tuning[pivotIndex]]
    ),
    arr
  ) as Set<Note>[];

export const updateActiveFrets =
  (coords: string, patternIndex: number, note: Note) => (prev: any) => {
    const newObj = { ...prev };
    console.log("updateActiveFrets ",{newObj})
    const curKey = coords;
    newObj[curKey] = [...(newObj[curKey] || [null, null, null])];
    newObj[curKey][patternIndex] = note;
    return newObj;
  };
