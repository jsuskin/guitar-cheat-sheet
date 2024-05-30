"use client";
/** IMPORTS **/
import { useEffect, useState } from "react";

// Component Imports
import Fretboard from "./components/Fretboard";
import MajorScaleKeySelector from "./components/MajorScaleKeySelector";
import { default as _IntervalPatterns } from "./components/IntervalPatterns";

// Util Imports
import { modesObj } from "@/constants";
import type {
  Accidental,
  ModalDisplayList,
  IntervalPatternsDynamicProps,
} from "@/types";

// Redux Imports
import { setPatternsArray } from "./redux/features/fretboard/fretboardSlice";
import { useAppDispatch } from "./redux/hooks";

// Style Imports
import styles from "./page.module.css";

export default function Home() {
  // NOTE: Should prob change this, or least the name; I think noteNum refers to the index of a note from the root note and it gets changed later on so it's confusing af
  const [noteNum, setNoteNum] = useState(-1);

  // Whether to display A# or Bb in the interface
  const [displayAccidental, setDisplayAccidental] =
    useState<Accidental>("sharp");
  const [modalDisplayList, setModalDisplayList] = useState<ModalDisplayList>([
    0, 0, 0,
  ]);

  const dispatch = useAppDispatch();

  const IntervalPatterns = ({ type, activeList }: IntervalPatternsDynamicProps) => (
    <>
      <hr />
      <_IntervalPatterns
        {...{ type, activeList, setModalDisplayList }}
        modalDisplay={modalDisplayList[type - 1]}
        rootNoteIdx={noteNum}
        accidental={displayAccidental}
      />
    </>
  );

  useEffect(() => {
    const modeNames = ['Ionian', 'Dorian', 'Phrygian'];
    const patterns = modeNames.map(mName => modesObj[mName]);

    // dispatch(setPatternsArray(patterns));
    dispatch(setPatternsArray(modeNames.reduce((acc, cur, idx) => {
      return { ...acc, [cur]: modesObj[cur]};
    }, {})))
  }, []);

  // <Provider store={store}>
  return (
    <main className={styles.main}>
      <MajorScaleKeySelector
        noteNum={noteNum}
        setNoteNum={setNoteNum}
        accidental={displayAccidental}
        setAccidental={setDisplayAccidental}
      />
      <>
        <IntervalPatterns type={1} activeList={[0, 2, 4]} />
        <IntervalPatterns type={2} activeList={[0, 2, 3]} />
        <IntervalPatterns type={3} activeList={[0, 1, 3]} />
      </>
      <Fretboard rootNoteIdx={noteNum} displayAccidental={displayAccidental} />
      {/* </Provider> */}
    </main>
  );
}
