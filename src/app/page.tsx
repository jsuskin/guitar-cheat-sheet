"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { default as _TypeFragment } from "./components/TypeFragment";
import MajorScaleKeySelector from "./components/MajorScaleKeySelector";
import Fretboard from "./components/Fretboard";
import type {
  Accidental,
  ModalDisplayList,
  TypeFragmentDynamicProps,
} from "@/types";
import { modesObj } from "@/constants";
import {store} from '@/app/redux/store';
import { Provider } from "react-redux";

export default function Home() {
  // NOTE: Should prob change this, or least the name; I think noteNum refers to the index of a note from the root note and it gets changed later on so it's confusing af
  const [noteNum, setNoteNum] = useState(-1);

  // Whether to display A# or Bb in the interface
  const [displayAccidental, setDisplayAccidental] =
    useState<Accidental>("sharp");
  const [modalDisplayList, setModalDisplayList] = useState<ModalDisplayList>([
    0, 0, 0,
  ]);
  const [fretboardPatternsArray, setFretboardPatternsArray] = useState<
    number[][]
  >([[], [], []]);

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

  useEffect(() => {
    setFretboardPatternsArray([
      modesObj.Ionian,
      modesObj.Dorian,
      modesObj.Phrygian,
      // modesObj.Mixolydian,
    ]);
  }, []);

  return (
    <Provider store={store}>
      <main className={styles.main}>
        <MajorScaleKeySelector
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
        <Fretboard
          rootNoteIdx={noteNum }
          fretboardPatternsArray={fretboardPatternsArray}
        />
      </main>
    </Provider>
  );
}
