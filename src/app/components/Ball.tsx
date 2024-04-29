import React from "react";
import styles from "@/app/styles/typeFragment.module.css";
import type { Ball, Note, Range_3, Range_7, Range_12 } from "@/types";
import { correspondingModeNums, notesJoined } from "@/constants";
import { filterByAccidental, rotateArray } from "@/util/helper-methods";

export default function Ball({
  active,
  typeFragmentNum,
  ballIdx,
  rootNoteIdx,
  accidental,
  modalDisplay,
}: Ball) {
  const typeIdx = (typeFragmentNum - 1) as Range_3;
  const modeIdx = correspondingModeNums[typeIdx][modalDisplay] as Range_7;
  const noteIdx = ((ballIdx + typeIdx + modeIdx) % 12) as Range_12; // idx from selected root note, chromatic; i.e. root === 'B' ∴ 'D#' will give 4
  const scalePositionIdx = (Math.ceil(ballIdx / 2 + modeIdx) % 6) as Range_7;

  let note: undefined | Note;

  if (active && rootNoteIdx >= 0) {
    const pivot = rootNoteIdx + modeIdx - typeIdx - +!!(modeIdx - typeIdx);
    const rotatedArray: any[] = rotateArray(pivot, notesJoined).flat();
    note = [...rotatedArray[noteIdx]]
      .filter(filterByAccidental(accidental))
      .pop();
  }

  return (
    <div className={`${styles.ball} ${styles[`${active ? "" : "in"}active`]}`}>
      <p>
        {active
          ? note
            ? note
            : !scalePositionIdx
            ? "R"
            : scalePositionIdx + 1
          : ""}
      </p>
    </div>
  );
}
