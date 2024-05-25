import React, { useEffect, useState, useRef } from "react";
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
  const [hover, setHover] = useState(false);

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
    >
      {d.map((active, ballIdx) => (
        <Ball
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
