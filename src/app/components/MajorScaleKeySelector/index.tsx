import React, { useEffect } from "react";
import styles from "@/app/styles/majorScaleKeySelector.module.css";
import type { Accidental, MajorScaleKeySelector, Note } from "@/types";
import { notesObj } from "@/constants";
import { getNoteIndex } from "@/util/helper-methods";
import { notesJoined } from "@/constants";
import AccidentalToggle from "./AccidentalToggle";
import KeySelectorButton from "./KeySelectorButton";

export default function MajorScaleKeySelector({
  selected,
  setSelected,
  noteNum,
  setNoteNum,
  accidental,
  setAccidental,
}: MajorScaleKeySelector) {
  const notes = notesObj[accidental] as Note[];

  const handleNoteClick = (note: Note) => (e: any) => {
    e.preventDefault();

    setSelected(selected === note ? null : note); // X

    const noteIdx = notesJoined.findIndex((set: Set<Note>) => set.has(note));
    setNoteNum((prev: number) => (prev === noteIdx ? -1 : noteIdx));
  };

  const handleAccidentalClick = (accidental: Accidental) => (e: any) => {
    e.preventDefault();
    setAccidental(accidental);
  };

  useEffect(() => {
    console.log({ selected, noteNum });
  }, [selected, noteNum]);

  return (
    <section className={styles["key-selector-container"]}>
      <h1>Major Scale Key Selector</h1>
      <div>
        <div>
          {notes.map((note, idx) => (
            <KeySelectorButton
              key={idx}
              handleClick={handleNoteClick}
              {...{ selected, note }}
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
