"use client";
/** IMPORTS **/
import { useEffect, useState } from "react";

// Component Imports
import Fretboard from "./components/Fretboard";
import MajorScaleKeySelector from "./components/MajorScaleKeySelector";
import { default as _IntervalPatterns } from "./components/IntervalPatterns";

// Util Imports
import { getPatternsArray, zeroBase } from "@/util/helper-methods";
import type {
  Accidental,
  ModalDisplayList,
  IntervalPatternsDynamicProps,
} from "@/types";

// Redux Imports
import {
  setPatternsArray,
  setModalDisplayList as _setModalDisplayList,
} from "./redux/features/fretboard/fretboardSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

// Style Imports
import styles from "./page.module.css";

export default function Home() {
  // NOTE: Should prob change this, or least the name; I think noteNum refers to the index of a note from the root note and it gets changed later on so it's confusing af
  const [noteNum, setNoteNum] = useState(-1);

  // Whether to display A# or Bb in the interface
  const [displayAccidental, setDisplayAccidental] =
    useState<Accidental>("sharp");
  // const [modalDisplayList, setModalDisplayList] = useState<ModalDisplayList>([
  //   0, 0, 0,
  // ]);
  const fretboardPatternsArray = useAppSelector(
    (state: any) => state.fretboard.patternsArray
  );
  const modalDisplayList = useAppSelector(
    (state: any) => state.fretboard.modalDisplayList
  );

  const dispatch = useAppDispatch();

  /**
   * @function setModalDisplayList
   * 
   * @param {Array} arr - The input array
   * @param {number} arr[0] - The index in modalDisplayList we want to mutate
   * @param {number} arr[1] - The mode index we want to insert into modalDisplayList[arr[0]]
   */
  const setModalDisplayList = (arr: any) =>
    dispatch(_setModalDisplayList(arr));

  const IntervalPatterns = ({
    type,
    activeList,
    modeName,
  }: IntervalPatternsDynamicProps) => (
    <>
      <hr />
      <_IntervalPatterns
        {...{ type, activeList, setModalDisplayList, modeName }}
        modalDisplay={modalDisplayList[type - 1]}
        rootNoteIdx={noteNum}
        accidental={displayAccidental}
      />
    </>
  );

  useEffect(() => {
    const initPatterns = ["Ionian", "Dorian", "Phrygian"];
    dispatch(setPatternsArray(getPatternsArray(...initPatterns) as any));
  }, []);

  return (
    <main className={styles.main}>
      <MajorScaleKeySelector
        noteNum={noteNum}
        setNoteNum={setNoteNum}
        accidental={displayAccidental}
        setAccidental={setDisplayAccidental}
      />
      <ul>
        {Object.entries(fretboardPatternsArray).map(
          ([modeName, activeList]: any, idx: any) => (
            <IntervalPatterns
              key={idx}
              type={idx + 1}
              activeList={activeList.map(zeroBase)}
              {...{ modeName }}
            />
          )
        )}
      </ul>
      <Fretboard rootNoteIdx={noteNum} displayAccidental={displayAccidental} />
    </main>
  );
}
