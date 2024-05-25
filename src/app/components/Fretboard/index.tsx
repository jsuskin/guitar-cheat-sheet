"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/fretboard.module.css";
import { SVG } from "@svgdotjs/svg.js";
import { notesJoined, notesObj } from "@/constants";
import { Note, Range_3 } from "@/types";
import {
  addDotToGroup,
  rotateArray,
  updateActiveFrets,
} from "./helper-methods";

export default function Fretboard({ rootNoteIdx, fretboardPatternsArray }: any) {
  const [fretboardSVG, setFretboardSVG] = useState<any>(null);
  const [activeFrets, setActiveFrets] = useState({});

  useEffect(() => {
    const fretboard: any = SVG("#fretboard-svg");
    setFretboardSVG(fretboard);
  }, []);

  const addFretDots = (
    note: Note = "C",
    fillColor: string,
    translate: number = 0,
    patternIndex: Range_3 | number
  ) => {
    const matchingFrets = [];

    for (let stringIdx = 0; stringIdx < 6; stringIdx++) {
      const rotatedNotes = rotateArray(notesJoined, stringIdx);

      for (let fretIdx = 0; fretIdx < 24; fretIdx++) {
        if (rotatedNotes[fretIdx % 12].has(note)) {
          const coords = [stringIdx, fretIdx];

          matchingFrets.push(coords);

          // setActiveFrets(
          //   updateActiveFrets(coords.join("_"), patternIndex, note)
          // );
        }
      }
    }

    if (fretboardSVG) {
      // console.log({ matchingFrets });
      const group = fretboardSVG.group(); // Create a <g> element
      matchingFrets.forEach(addDotToGroup(group, note, fillColor, translate));
      group.addTo(fretboardSVG); // Append the <g> element to the SVG
    }
  };

  useEffect(() => {
    const clearFretboardSVG = () => fretboardSVG.find(".active-fret").remove();

    if (fretboardSVG) clearFretboardSVG();

    if (rootNoteIdx >= 0) {
      fretboardPatternsArray.forEach((arr: number[], idx: Range_3 | number) => {
        arr.forEach((noteIdx: number) => {
          const note: any = rotateArray(
            notesObj.sharp as any,
            rootNoteIdx,
            "root note"
          )[noteIdx];

          // console.log("in fretboardPatternsArray: ", { arr, noteIdx, note });

          addFretDots(
            note,
            noteIdx
              ? ["#1db52f", "#b01bb3", "#ed8e11", "#e8eb34"][idx]
              : "#ff2323",
            !idx ? 0 : idx === 1 ? -80 : 80,
            idx
          );
        });
      });
    }
  }, [rootNoteIdx, fretboardPatternsArray]);

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
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='1961.45893740149' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='2287.81842465763' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='2960.5355568606' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='3308.01576725424' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='3595.49597764788' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='4194.81880839855' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='4507.66152087317' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='4760.50423334779' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='5294.4401750158' width='2000.0' height='60' />
          </g>
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
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='8132.59096674305' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8280.77071037112' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8617.12927647261' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='8805.86938166942' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8934.60948686625' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9234.27090224158' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='9405.69225847889' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9517.1136147162' width='2000.0' height='60' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9784.08158555021' width='2000.0' height='60' />
          </g>
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
