import { Accidental } from '@/types';
import styles from "@/app/styles/majorScaleKeySelector.module.css";
import React from 'react'

export default function AccidentalToggle({ accidental, handleClick }: {accidental: Accidental, handleClick: any}) {
  const displaySharps = accidental === "sharp";
  
  return (
    <button
      className={styles["accidental-selector-button"]}
      onClick={handleClick(displaySharps ? "flat" : "sharp")}
      title={`Display ${displaySharps ? "flats" : "sharps"}`}
    >
      <p style={{position:"absolute"}}>{displaySharps ? "♭" : "♯"}</p>
    </button>
  );
}
