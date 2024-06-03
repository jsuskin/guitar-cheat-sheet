import React, { useEffect, useState, useRef } from "react";
import IntervalStepIcon from "./StepIcon";
import type { Range_5, IntervalPatterns } from "@/types";
import styles from "@/app/styles/intervalPatterns.module.css";

export default function IntervalSteps({
  activeList,
  type,
  rootNoteIdx,
  accidental,
  modalDisplay,
  modeName
}: any) {
  const d = Array.from({ length: 5 }, (_, idx) => activeList.includes(idx));
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) {
    } else {
    }
  }, [hover]);

  return (
    <ul
      className={styles["type-fragment"]}
      style={{ backgroundColor: hover ? "#A6A9E94C" : "transparent" }}
      onMouseEnter={() => {
        if (!hover) setHover(true);
      }}
      onMouseLeave={() => {
        if (hover) setHover(false);
      }}
      title={modeName}
    >
      {d.map((active, ballIdx) => (
        <IntervalStepIcon
          key={ballIdx}
          ballIdx={ballIdx as Range_5}
          typeFragmentNum={type}
          {...{
            active,
            rootNoteIdx,
            accidental,
            modalDisplay,
            hover,
            setHover,
          }}
        />
      ))}
    </ul>
  );
}
