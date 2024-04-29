"use client";
import React, { useEffect } from "react";
import Ball from "../Ball";
import styles from "@/app/styles/typeFragment.module.css";
import type { Range_5, TypeFragment } from "@/types";
import TypeFragmentHeader from "./TypeFragmentHeader";
import ModesList from "./ModesList";

export default function TypeFragment({
  type,
  activeList,
  rootNoteIdx,
  accidental,
  modalDisplay,
  setModalDisplayList,
}: TypeFragment) {
  const d = Array.from({ length: 5 }, (_, idx) => activeList.includes(idx));

  return (
    <section className={styles["type-fragment-container"]}>
      <TypeFragmentHeader {...{ type }} />
      <div>
        <div className={styles["corresponding-modes"]}>
          <h3 className={styles["corresponding-modes-header"]}>
            Corresponding Modes
          </h3>
          <ModesList
            typeIdx={type - 1}
            {...{
              setModalDisplayList,
              modalDisplay,
              rootNoteIdx,
              activeList,
              accidental,
            }}
          />
        </div>
      </div>
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
    </section>
  );
}
