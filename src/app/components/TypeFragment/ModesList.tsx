import React from "react";
import styles from "@/app/styles/typeFragment.module.css";
import {
  correspondingModeNames,
  correspondingModeNums,
  modes,
  notesJoined,
} from "@/constants";
import type { Note, Range_3 } from "@/types";
import { getNotesFromRoot, getActiveNotes } from "@/util/helper-methods";

export default function ModesList({
  setModalDisplayList,
  modalDisplay,
  typeIdx,
  rootNoteIdx,
  activeList,
  accidental
}: any) {
  return (
    <ul className={styles["corresponding-modes-list"]}>
      {correspondingModeNames[typeIdx].map((modeName, idx) => {
        let modeNotesText = "";

        if (rootNoteIdx >= 0) {
          const notesFromRoot = getNotesFromRoot(
            rootNoteIdx,
            notesJoined,
            modes.indexOf(modeName)
          );

          const activeNoteSets = notesFromRoot.filter((_, idx) =>
            activeList.includes(idx)
          );

          const activeNotes = getActiveNotes(
            activeNoteSets as Set<Note>[],
            accidental
          );

          modeNotesText = ` → ${activeNotes.join(", ")}`;
        }

        return (
          <li key={idx}>
            <button
              onClick={(e) => {
                e.preventDefault();

                setModalDisplayList((prev: Range_3[]) => {
                  const newArr = [...prev];
                  newArr[typeIdx] = idx as 0 | 1;
                  return newArr;
                });
              }}
              className={`${styles["mode-button"]} ${
                styles[idx === modalDisplay ? "active" : "inactive"]
              }`}
            >
              {modeName}
            </button>
            &nbsp;
            {`(${correspondingModeNums[typeIdx][idx] + 1})${modeNotesText}`}
          </li>
        );
      })}
      <li>
        <button className={styles["mode-button"]}>Show All</button>
      </li>
    </ul>
  );
}
