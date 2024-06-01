import {
  tuning,
  stringXPositions,
  fretMidpoints,
  notesJoined,
  notesObj,
  fretDotColors,
} from "@/constants";
import type { Mode, Note } from "@/types";
import { rotateArray as _rotateArray } from "@/util/helper-methods";
import { v4 as uuidv4 } from "uuid";
import { SVG, Svg } from "@svgdotjs/svg.js";

export const addDotToGroup =
  (
    group: any,
    note: Note,
    fillColor: string,
    rootNote: Note,
    modeName: string
  ) =>
  ([stringIdx, fretIdx]: number[]) => {
    const coords = `s${stringIdx}_f${fretIdx}`;

    const circle = group
      .circle(100)
      .fill(fillColor)
      .move(+stringXPositions[stringIdx] - 40, +fretMidpoints[fretIdx])
      .attr({ key: uuidv4(), class: `active-fret ${coords} ${modeName}` });

    // Add click handler to dot
    circle.click(function () {
      console.log("circle click");
      circle.remove();
    });

    // Add title to dot
    circle
      .element("title")
      .words(`${rootNote} ${modeName} -> ${note}__${coords}`);
  };

export const rotateArray = (
  arr: any,
  pivotIndex: number,
  pivotType: "open string" | "root note" = "open string"
) =>
  _rotateArray(
    arr.indexOf(
      arr[pivotType === "root note" ? pivotIndex : tuning[pivotIndex]]
    ),
    arr
  ) as any;

export const updateActiveFrets =
  (coords: string, patternIndex: number, note: Note) => (prev: any) => {
    const newObj = { ...prev };
    console.log("updateActiveFrets ", { newObj });
    const curKey = coords;
    newObj[curKey] = [...(newObj[curKey] || [null, null, null])];
    newObj[curKey][patternIndex] = note;
    return newObj;
  };

export const getMatchingFrets = (note: Note) => {
  const matchingFrets = [];

  // Loop through strings
  for (let stringIdx = 0; stringIdx < 6; stringIdx++) {
    const rotatedNotes = rotateArray(notesJoined as any, stringIdx as any);

    // Loop through frets
    for (let fretIdx = 0; fretIdx < 24; fretIdx++) {
      if ((rotatedNotes[fretIdx % 12] as any).has(note))
        matchingFrets.push([stringIdx, fretIdx]);
    }
  }

  return matchingFrets;
};

export const positionDots = (len: number) => (element: any, idx: number) => {
  const cx = element.attr("cx");

  // Position dots where multiple pattern steps coincide w the current string_fret
  if (len === 2) {
    if (!idx) element.animate(400).x(cx - 110);
    if (idx) element.animate(400).x(cx + 10);
  } else if (idx && len === 3) {
    if (idx === 1) element.animate(400).x(cx - 140);
    if (idx === 2) element.animate(400).x(cx + 40);
  }
};

export const initializeRef = (ref: any) => {
  // Initialize the SVG instance and store it in the ref
  ref.current = SVG("#fretboard-svg") as Svg;
};

export const addFretDots = (
  note: Note,
  fillColor: string,
  modeName: string,
  rootNote: Note,
  fretboardSVGRef: any,
  groupsMapRef: any
) => {
  const matchingFrets = getMatchingFrets(note);

  if (fretboardSVGRef.current) {
    const group = fretboardSVGRef.current.group(); // Create a <g> element

    matchingFrets.forEach((coords: any) => {
      const key = coords.join("_"); // `${stringIdx}_${fretIdx}`

      addDotToGroup(group, note, fillColor, rootNote, modeName)(coords);

      if (!groupsMapRef.current.has(key)) groupsMapRef.current.set(key, []);

      groupsMapRef.current.get(key).push(group);
    });

    group.addTo(fretboardSVGRef.current); // Append the <g> element to the SVG
  }
};

export const addModeDots =
  (
    displayAccidental: "sharp" | "flat",
    rootNoteIdx: number,
    fretboardSVGRef: any,
    groupsMapRef: any
  ) =>
  ([modeName, arr]: any, patternIdx: number) => {
    arr.forEach((noteIdx: number) => {
      const notesArray = notesObj[displayAccidental];
      const rootNote = notesArray[rootNoteIdx];
      const curNote: Note = rotateArray(notesArray, rootNoteIdx, "root note")[
        noteIdx
      ];
      const dColor = fretDotColors[!noteIdx ? 0 : patternIdx + 1];

      addFretDots(
        curNote,
        dColor,
        modeName,
        rootNote,
        fretboardSVGRef,
        groupsMapRef
      );
    });
  };
