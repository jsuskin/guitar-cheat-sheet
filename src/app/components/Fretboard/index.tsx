"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/app/styles/fretboard.module.css";
import { SVG, Svg } from "@svgdotjs/svg.js";
import { fretDotColors, notesJoined, notesObj } from "@/constants";
import { Note, Range_3 } from "@/types";
import {
  addDotToGroup,
  rotateArray,
  updateActiveFrets,
} from "./helper-methods";
import { useAppSelector } from "@/app/redux/hooks";

export default function Fretboard({ rootNoteIdx }: any) {
  // const [fretboardSVG, setFretboardSVG] = useState<any>(null);
  // const [activeFrets, setActiveFrets] = useState({});
  const fretboardPatternsArray = useAppSelector((state: any) =>
    state.fretboard.patternsArray
  );
  const fretboardSVGRef = useRef<Svg | null>(null);
  const groupsMapRef = useRef<Map<string, any>>(new Map());
  const [mapUpdateTrigger, setMapUpdateTrigger] = useState(0);

  useEffect(() => {
    // Initialize the SVG instance and store it in the ref
    fretboardSVGRef.current = SVG("#fretboard-svg") as Svg;
  }, []);

  const addFretDots = (
    note: Note = "C",
    fillColor: string,
    patternIndex: Range_3 | number
  ) => {
    const matchingFrets = [];

    for (let stringIdx = 0; stringIdx < 6; stringIdx++) {
      const rotatedNotes = rotateArray(notesJoined, stringIdx);

      for (let fretIdx = 0; fretIdx < 24; fretIdx++) {
        if (rotatedNotes[fretIdx % 12].has(note)) {
          const coords = [stringIdx, fretIdx];

          matchingFrets.push(coords);
        }
      }
    }

    if (fretboardSVGRef.current) {
      const group = fretboardSVGRef.current.group(); // Create a <g> element
      matchingFrets.forEach((coords) => {
        addDotToGroup(group, note, fillColor)(coords);
        const key = coords.join("_"); // `${stringIdx}_${fretIdx}`
        if (!groupsMapRef.current.has(key)) groupsMapRef.current.set(key, []);
        groupsMapRef.current.get(key).push(group);
      });
      group.addTo(fretboardSVGRef.current); // Append the <g> element to the SVG
      setMapUpdateTrigger((prev) => prev + 1); // Trigger state update
    }
  };

  useEffect(() => {
    const clearFretboardSVG = () =>
      (fretboardSVGRef.current?.find(".active-fret") as any).remove();

    // Clear fretboard dots first any time the array changes
    if (fretboardSVGRef.current) clearFretboardSVG();

    // Repop fretboard w dots from most current array
    if (rootNoteIdx >= 0) {
      Object.entries(fretboardPatternsArray).forEach(
        ([modeName, arr]: any, patternIdx: Range_3 | number) => {
          arr.forEach((noteIdx: number) => {
            const note: any = rotateArray(
              notesObj.sharp as any,
              rootNoteIdx,
              "root note"
            )[noteIdx];

            addFretDots(
              note,
              fretDotColors[!noteIdx ? 0 : patternIdx + 1],
              patternIdx
            );
          });
        }
      );
    }
    console.log({fretboardPatternsArray})
  }, [rootNoteIdx, fretboardPatternsArray]);

  useEffect(() => {
    // console.log({ groupsMapRef: groupsMapRef.current });
    groupsMapRef.current.forEach((value, key) => {
      const len = value.length;
      if (len > 1) {
        console.log({ key, value });
        const group = fretboardSVGRef.current?.find(
          `.${key
            .split("_")
            .map((n, i) => `${i ? "f" : "s"}${n}`)
            .join("_")}`
        );
        group?.forEach((element, idx) => {
          const cx = element.attr("cx");
          const cy = element.attr("cy");
          console.log({ cy, len });

          if (len === 2) {
            if (!idx) element.animate(400).x(cx - 110);
            if (idx) element.animate(400).x(cx + 10);
          } else if (idx && len === 3) {
            if(idx === 1) element.animate(400).x(cx - 140)
            if(idx === 2) element.animate(400).x(cx + 40)
          }
        });
      }
    });
  }, [mapUpdateTrigger]);

  return (
    <div className={styles["fretboard-container"]}>
      <svg
        id='fretboard-svg'
        viewBox='-225 0 2050 11500'
        xmlns='http://www.w3.org/2000/svg'
      >
        <linearGradient id='string-pattern'>
          <stop offset='5%' stopColor='#888' />
          <stop offset='50%' stopColor='#FFF' />
          <stop offset='95%' stopColor='#888' />
        </linearGradient>
        <g style={{ stroke: "black", fill: "rgb(255,255,255)" }}>
          <rect x='-200' y='50.0' width='2000.0' height='10800' />
        </g>
        <g id='frets'>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='20.0' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='820.0' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='1575.09945014535' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 3 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='1961.45893740149' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='2287.81842465763' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='2960.5355568606' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 5 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='3308.01576725424' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='3595.49597764788' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='4194.81880839855' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 7 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='4507.66152087317' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='4760.50423334779' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='5294.4401750158' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 9 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='5576.42438499478' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='5798.40859497375' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='6274.09144097484' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='6723.07626029859' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 12 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='350.0' cy='6964.96887917045' r='65' />
            <circle cx='850.0' cy='6964.96887917045' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='7146.86149804231' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='7546.86149804231' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='7924.41122311498' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 15 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='8132.59096674305' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8280.77071037112' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8617.12927647261' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 17 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='8805.86938166942' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8934.60948686625' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9234.27090224158' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 19 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='9405.69225847889' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9517.1136147162' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9784.08158555021' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 21 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='9940.0736905397' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='10036.0657955292' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='10273.9072185297' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='10498.3996281916' width='2000.0' height='60' />
          </g>
          {/* FRET MARKER - 24 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='350.0' cy='10634.3459376275' r='65' />
            <circle cx='850.0' cy='10634.3459376275' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='10710.2922470635' width='2000.0' height='60' />
          </g>
        </g>
        <g id='strings'>
          <g style={{ stroke: "none", fill: "url(#string-pattern)" }}>
            <rect x='16.666666667' y='50.0' width='20' height='10800' />
          </g>
          <g style={{ stroke: "none", fill: "url(#string-pattern)" }}>
            <rect x='325.0' y='50.0' width='20' height='10800' />
          </g>
          <g style={{ stroke: "none", fill: "url(#string-pattern)" }}>
            <rect x='633.33333333' y='50.0' width='20' height='10800' />
          </g>
          <g style={{ stroke: "none", fill: "url(#string-pattern)" }}>
            <rect x='941.66666667' y='50.0' width='20' height='10800' />
          </g>
          <g style={{ stroke: "none", fill: "url(#string-pattern)" }}>
            <rect x='1250.0' y='50.0' width='20' height='10800' />
          </g>
          <g style={{ stroke: "none", fill: "url(#string-pattern)" }}>
            <rect x='1558.33333333' y='50.0' width='20' height='10800' />
          </g>
        </g>
      </svg>
    </div>
  );
}
