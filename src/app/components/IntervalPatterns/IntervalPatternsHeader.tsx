import React from "react";
import styles from "@/app/styles/intervalPatterns.module.css";
import { typeIntervals } from "@/constants";

export default function IntervalPatternsHeader({ type }: { type: number }) {
  return (
    <h1>
      Type {type}&nbsp;&nbsp;&nbsp;
      <span className={styles["type-fragment-intervals"]}>
        {typeIntervals[type - 1]}
      </span>
    </h1>
  );
}
