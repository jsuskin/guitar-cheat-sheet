"use client";
import { useAppSelector } from "@/app/redux/hooks";
import styles from "@/app/styles/fretboard.module.css";
import type { Fretboard } from "@/types";
import { Svg } from "@svgdotjs/svg.js";
import { useEffect, useRef, useState } from "react";
import { addModeDots, initializeRef, positionDots } from "./helper-methods";

export default function Fretboard({
  rootNoteIdx,
  displayAccidental,
}: Fretboard) {
  const fretboardPatternsArray = useAppSelector(
    (state: any) => state.fretboard.patternsArray
  );
  const fretboardSVGRef = useRef<Svg | null>(null);
  const groupsMapRef = useRef<Map<string, any>>(new Map());
  const [mapUpdateTrigger, setMapUpdateTrigger] = useState(0);

  useEffect(() => {
    initializeRef(fretboardSVGRef);
  }, []);

  useEffect(() => {
    const clearFretboardSVG = () =>
      (fretboardSVGRef.current?.find(".active-fret") as any).remove();

    // Clear fretboard dots first any time the array changes
    if (fretboardSVGRef.current) clearFretboardSVG();

    // Repop fretboard w dots from most current array
    if (rootNoteIdx >= 0)
      Object.entries(fretboardPatternsArray).forEach(
        addModeDots(
          displayAccidental,
          rootNoteIdx,
          fretboardSVGRef,
          groupsMapRef
        )
      );
      
    setMapUpdateTrigger((prev: any) => prev + 1); // Trigger state update
  }, [rootNoteIdx, fretboardPatternsArray]);

  useEffect(() => {
    groupsMapRef.current.forEach((value, key) => {
      const len = value.length;
      const keySplit = key.split("_");

      if (len > 1) {
        const group = fretboardSVGRef.current?.find(
          `.${keySplit.map((n, i) => `${i ? "f" : "s"}${n}`).join("_")}`
        );

        group?.forEach(positionDots(len));
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
            <foreignObject x='-600' y='300' width='300' height='4000'>
              <div
                style={{
                  fontSize: "20em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                0
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='820.0' width='2000.0' height='60' />
            <foreignObject x='-600' y='1050' width='300' height='4000'>
              <div
                style={{
                  fontSize: "19.8em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                1
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='1575.09945014535' width='2000.0' height='60' />
            <foreignObject x='-600' y='1800' width='300' height='4000'>
              <div
                style={{
                  fontSize: "19.6em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                2
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 3 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='1961.45893740149' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='2287.81842465763' width='2000.0' height='60' />
            <foreignObject x='-600' y='2500' width='300' height='4000'>
              <div
                style={{
                  fontSize: "19.4em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                3
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='2960.5355568606' width='2000.0' height='60' />
            <foreignObject x='-600' y='3150' width='300' height='4000'>
              <div
                style={{
                  fontSize: "19.1em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                4
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 5 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='3308.01576725424' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='3595.49597764788' width='2000.0' height='60' />
            <foreignObject x='-600' y='3750' width='300' height='4000'>
              <div
                style={{
                  fontSize: "18.7em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                5
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='4194.81880839855' width='2000.0' height='60' />
            <foreignObject x='-600' y='4350' width='300' height='4000'>
              <div
                style={{
                  fontSize: "18.4em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                6
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 7 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='4507.66152087317' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='4760.50423334779' width='2000.0' height='60' />
            <foreignObject x='-600' y='4900' width='300' height='4000'>
              <div
                style={{
                  fontSize: "18.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                7
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='5294.4401750158' width='2000.0' height='60' />
            <foreignObject x='-600' y='5425' width='300' height='4000'>
              <div
                style={{
                  fontSize: "17.5em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                8
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 9 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='5576.42438499478' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='5798.40859497375' width='2000.0' height='60' />
            <foreignObject x='-600' y='5900' width='300' height='4000'>
              <div
                style={{
                  fontSize: "17.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                9
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='6274.09144097484' width='2000.0' height='60' />
            <foreignObject x='-600' y='6350' width='300' height='4000'>
              <div
                style={{
                  fontSize: "16.3em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                10
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='6723.07626029859' width='2000.0' height='60' />
            <foreignObject x='-600' y='6800' width='300' height='4000'>
              <div
                style={{
                  fontSize: "15.9em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                11
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 12 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='350.0' cy='6964.96887917045' r='65' />
            <circle cx='850.0' cy='6964.96887917045' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='7146.86149804231' width='2000.0' height='60' />
            <foreignObject x='-600' y='7250' width='300' height='4000'>
              <div
                style={{
                  fontSize: "15.5em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                12
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='7546.86149804231' width='2000.0' height='60' />
            <foreignObject x='-600' y='7650' width='300' height='4000'>
              <div
                style={{
                  fontSize: "15.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                13
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='7924.41122311498' width='2000.0' height='60' />
            <foreignObject x='-600' y='8000' width='300' height='4000'>
              <div
                style={{
                  fontSize: "14.5em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                14
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 15 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='8132.59096674305' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8280.77071037112' width='2000.0' height='60' />
            <foreignObject x='-600' y='8350' width='300' height='4000'>
              <div
                style={{
                  fontSize: "14.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                15
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8617.12927647261' width='2000.0' height='60' />
            <foreignObject x='-600' y='8700' width='300' height='4000'>
              <div
                style={{
                  fontSize: "13.5em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                16
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 17 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='8805.86938166942' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='8934.60948686625' width='2000.0' height='60' />
            <foreignObject x='-600' y='9000' width='300' height='4000'>
              <div
                style={{
                  fontSize: "13.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                17
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9234.27090224158' width='2000.0' height='60' />
            <foreignObject x='-600' y='9300' width='300' height='4000'>
              <div
                style={{
                  fontSize: "12.5em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                18
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 19 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='9405.69225847889' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9517.1136147162' width='2000.0' height='60' />
            <foreignObject x='-600' y='9575' width='300' height='4000'>
              <div
                style={{
                  fontSize: "12.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                19
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='9784.08158555021' width='2000.0' height='60' />
            <foreignObject x='-600' y='9825' width='300' height='4000'>
              <div
                style={{
                  fontSize: "11.5em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                20
              </div>
            </foreignObject>
          </g>
          {/* FRET MARKER - 21 */}
          <g style={{ stroke: "none", fill: "rgb(255,255,240)" }}>
            <circle cx='600.0' cy='9940.0736905397' r='65' />
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='10036.0657955292' width='2000.0' height='60' />
            <foreignObject x='-600' y='10075' width='300' height='4000'>
              <div
                style={{
                  fontSize: "11.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                21
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='10273.9072185297' width='2000.0' height='60' />
            <foreignObject x='-600' y='10310' width='300' height='4000'>
              <div
                style={{
                  fontSize: "10.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                22
              </div>
            </foreignObject>
          </g>
          <g style={{ stroke: "black", fill: "rgb(192,192,192)" }}>
            <rect x='-200' y='10498.3996281916' width='2000.0' height='60' />
            <foreignObject x='-600' y='10550' width='300' height='4000'>
              <div
                style={{
                  fontSize: "9.0em",
                  color: "rgba(0, 0, 0, 0.3)",
                  textAlign: "right",
                }}
              >
                23
              </div>
            </foreignObject>
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
