import React, {useEffect} from 'react'
import styles from "@/app/styles/majorScaleKeySelector.module.css";

export default function KeySelectorButton({selected, note, handleClick}: any) {
  // useEffect(() => {console.log({selected})},[selected])
  return (
    <button
      className={`${styles["key-selector-button"]} ${
        styles[`${selected === note ? "" : "in"}active`]
      }`}
      onClick={handleClick(note)}
    >
      <p>
        {note[0]}
        <span className={styles["key-selector-accidental-text"]}>{note[1]}</span>
      </p>
    </button>
  );
}
