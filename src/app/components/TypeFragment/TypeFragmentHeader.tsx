import React from "react";
import styles from "@/app/styles/typeFragment.module.css";
import { typeIntervals } from "@/constants";

export default function TypeFragmentHeader({ type }: { type: 1 | 2 | 3 }) {
  return (
    <h1>
      Type {type}&nbsp;&nbsp;&nbsp;
      <span className={styles["type-fragment-intervals"]}>
        {typeIntervals[type - 1]}
      </span>
    </h1>
  );
}
