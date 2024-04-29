import React from "react";
import styles from "@/app/styles/typeFragment.module.css";
import type { Range_2, Range_3, Range_5, TypeFragment } from "@/types";
import TypeFragmentHeader from "./TypeFragmentHeader";
import ModesList from "./ModesList";
import { default as _Balls } from "./Balls";

export default function TypeFragment({
  type,
  activeList,
  rootNoteIdx,
  accidental,
  modalDisplay,
  setModalDisplayList,
}: TypeFragment) {
  const Balls = ({ _modalDisplay = modalDisplay }: any) => (
    <_Balls
      {...{
        rootNoteIdx,
        accidental,
        type,
        activeList,
        modalDisplay: _modalDisplay,
      }}
    />
  );

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
      <div>
        {modalDisplay === "all" ? (
          <>
            <Balls _modalDisplay={0} />
            <Balls _modalDisplay={1} />
            {type === 1 && <Balls _modalDisplay={2} />}
          </>
        ) : (
          <Balls />
        )}
      </div>
    </section>
  );
}
