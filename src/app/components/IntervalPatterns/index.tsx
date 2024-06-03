import React, { useEffect } from "react";
import styles from "@/app/styles/intervalPatterns.module.css";
import type { Range_2, Range_3, Range_5, IntervalPatterns } from "@/types";
import IntervalPatternsHeader from "./IntervalPatternsHeader";
import ModesList from "./ModesList";
import { default as _IntervalSteps } from "./IntervalSteps";
import { modes } from "@/constants";

export default function IntervalPatterns({
  type,
  activeList,
  rootNoteIdx,
  accidental,
  modalDisplay,
  modeName,
  setModalDisplayList,
}: IntervalPatterns) {
  const IntervalSteps = ({ _modalDisplay = modalDisplay, modeName }: any) => (
    <_IntervalSteps
      {...{
        rootNoteIdx,
        accidental,
        type,
        activeList,
        modalDisplay: _modalDisplay,
        modeName
      }}
    />
  );

  const getModeNameFromPatternIndex = (patternIndex: number) =>
    modes[
      [
        [0, 3, 4],
        [1, 5],
        [2, 6],
      ][type - 1][patternIndex]
    ];

  const getCurModeIdx = () => typeof modalDisplay === "number" ? modalDisplay : 0

  return (
    <section className={styles["type-fragment-container"]}>
      <IntervalPatternsHeader {...{ type }} />
      <div>
        <div className={styles["corresponding-modes"]}>
          <h3 className={styles["corresponding-modes-header"]}>
            Corresponding Modes
          </h3>
          <ModesList
            typeIdx={type - 1}
            {...{
              setModalDisplayList,
              modalDisplay,
              rootNoteIdx,
              activeList,
              accidental,
            }}
          />
        </div>
      </div>
      <div>
        <>
          <IntervalSteps
            _modalDisplay={getCurModeIdx()}
            modeName={getModeNameFromPatternIndex(getCurModeIdx())}
          />
          {modalDisplay === "all" && (
            <>
              <IntervalSteps
                _modalDisplay={1}
                modeName={getModeNameFromPatternIndex(1)}
              />
              {type === 1 && (
                <IntervalSteps
                  _modalDisplay={2}
                  modeName={getModeNameFromPatternIndex(2)}
                />
              )}
            </>
          )}
        </>
      </div>
    </section>
  );
}
