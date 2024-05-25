import React, { useEffect } from "react";
import styles from "@/app/styles/majorScaleKeySelector.module.css";
import type { Accidental, MajorScaleKeySelector, Note } from "@/types";
import { notesObj } from "@/constants";
import { getNoteIndex } from "@/util/helper-methods";
import { notesJoined } from "@/constants";
import AccidentalToggle from "./AccidentalToggle";
import KeySelectorButton from "./KeySelectorButton";

export default function MajorScaleKeySelector({
  noteNum,
  setNoteNum,
  accidental,
  setAccidental,
}: MajorScaleKeySelector) {
  const notes = notesObj[accidental] as Note[];
  const selected = notes[noteNum];

  const handleNoteClick = (note: Note | null) => (e: any) => {
    e.preventDefault();

    if (note) {
      const noteIdx = notesJoined.findIndex((set: Set<Note>) => set.has(note));
      setNoteNum((prev: number) => (prev === noteIdx ? -1 : noteIdx));
    }
  };

  const handleAccidentalClick = (accidental: Accidental) => (e: any) => {
    e.preventDefault();
    setAccidental(accidental);
  };

  return (
    <section className={styles["key-selector-container"]}>
      {/* <h1>Major Scale Key Selector</h1> */}
      <div>
        <div>
          {notes.map((note, idx) => (
            <KeySelectorButton
              key={idx}
              handleClick={handleNoteClick}
              {...{ note, selected }}
            />
          ))}
        </div>
        <AccidentalToggle
          handleClick={handleAccidentalClick}
          {...{ accidental }}
        />
      </div>
    </section>
  );
}
