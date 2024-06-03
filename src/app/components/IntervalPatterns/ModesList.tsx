import React, { useEffect } from "react";
import styles from "@/app/styles/intervalPatterns.module.css";
import {
  correspondingModeNames,
  correspondingModeNums,
  modes,
  notesJoined,
} from "@/constants";
import type { Note, Range_3 } from "@/types";
import { getNotesFromRoot, getActiveNotes } from "@/util/helper-methods";
import { useAppSelector } from "@/app/redux/hooks";

export default function ModesList({
  setModalDisplayList,
  modalDisplay,
  typeIdx,
  rootNoteIdx,
  activeList,
  accidental,
}: any) {
  const modalDisplayList = useAppSelector((state:any) => state.fretboard.modalDisplayList);

  const handleSetDisplayTypePattern = (pIdx: number | "all") => (e: any) => {
    e.preventDefault();
    setModalDisplayList([typeIdx, pIdx]);
  };

  // useEffect(() => {

  // }, [])

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

        const selected = modalDisplayList[typeIdx] === idx
        console.log({ modalDisplayList, modalDisplay, idx, typeIdx, selected });

        return (
          <li key={idx}>
            <button
              onClick={handleSetDisplayTypePattern(idx)}
              className={`${styles["mode-button"]} ${
                styles[selected ? "active" : "inactive"]
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
        <button
          onClick={handleSetDisplayTypePattern("all")}
          className={styles["mode-button"]}
        >
          Show All
        </button>
      </li>
    </ul>
  );
}
