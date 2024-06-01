import React from "react";
import styles from "@/app/styles/intervalPatterns.module.css";
import type { Range_2, Range_3, Range_5, IntervalPatterns } from "@/types";
import IntervalPatternsHeader from "./IntervalPatternsHeader";
import ModesList from "./ModesList";
import { default as _IntervalSteps } from "./IntervalSteps";

export default function IntervalPatterns({
  type,
  activeList,
  rootNoteIdx,
  accidental,
  modalDisplay,
  modeName,
  setModalDisplayList,
}: IntervalPatterns) {
  console.log("in IntervalPatterns", {modeName, activeList, type})
  const IntervalSteps = ({ _modalDisplay = modalDisplay }: any) => {
    console.log("In IntervalPatterns>_IntervalSteps: ",{_modalDisplay,activeList})
    return (
    <_IntervalSteps
      {...{
        rootNoteIdx,
        accidental,
        type,
        activeList,
        modalDisplay: _modalDisplay,
      }}
    />
  )};

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
        {modalDisplay === "all" ? (
          <>
            <IntervalSteps _modalDisplay={0} />
            <IntervalSteps _modalDisplay={1} />
            {type === 1 && <IntervalSteps _modalDisplay={2} />}
          </>
        ) : (
          <IntervalSteps />
        )}
      </div>
    </section>
  );
}
