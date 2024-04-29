"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import _TypeFragment from "./components/TypeFragment";
import MajorScaleKeySelector from "./components/MajorScaleKeySelector";
import Fretboard from "./components/Fretboard";
import type {
  Accidental,
  Note,
  ModalDisplayList,
  TypeFragmentDynamicProps,
} from "@/types";

export default function Home() {
  const [selectedMajorKey, setSelectedMajorKey] = useState<Note | null>(null); // X
  const [noteNum, setNoteNum] = useState(-1);
  const [displayAccidental, setDisplayAccidental] =
    useState<Accidental>("sharp");
  const [modalDisplayList, setModalDisplayList] = useState<ModalDisplayList>([
    0, 0, 0,
  ]);

  const TypeFragment = ({ type, activeList }: TypeFragmentDynamicProps) => (
    <>
      <hr />
      <_TypeFragment
        {...{ type, activeList, setModalDisplayList }}
        modalDisplay={modalDisplayList[type - 1]}
        rootNoteIdx={noteNum}
        accidental={displayAccidental}
      />
    </>
  );

  return (
    <main className={styles.main}>
      <MajorScaleKeySelector
        selected={selectedMajorKey /* X */}
        setSelected={setSelectedMajorKey /* X */}
        noteNum={noteNum}
        setNoteNum={setNoteNum}
        accidental={displayAccidental}
        setAccidental={setDisplayAccidental}
      />
      <>
        <TypeFragment type={1} activeList={[0, 2, 4]} />
        <TypeFragment type={2} activeList={[0, 2, 3]} />
        <TypeFragment type={3} activeList={[0, 1, 3]} />
      </>
      <Fretboard />
    </main>
  );
}
