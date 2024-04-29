import React, { useEffect } from "react";
import Ball from "./Ball";
import type { Range_5, TypeFragment } from "@/types";
import styles from "@/app/styles/typeFragment.module.css";

export default function index({
  activeList,
  type,
  rootNoteIdx,
  accidental,
  modalDisplay,
}: any) {
  const d = Array.from({ length: 5 }, (_, idx) => activeList.includes(idx));

  return (
    <ul className={styles["type-fragment"]}>
      {d.map((active, ballIdx) => (
        <Ball
          key={ballIdx}
          ballIdx={ballIdx as Range_5}
          typeFragmentNum={type}
          {...{ active, rootNoteIdx, accidental, modalDisplay }}
        />
      ))}
    </ul>
  );
}
