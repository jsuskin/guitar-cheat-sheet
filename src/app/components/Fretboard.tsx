import React from "react";
import Image from "next/image";
import * as FretboardSVG from '../../../public/assets/fretboard-diagram.svg';
import styles from '@/app/styles/fretboard.module.css'

export default function Fretboard() {
  return (
    <div className={styles['fretboard-container']}>
      <Image
        priority
        src={FretboardSVG}
        alt='fretboard-diagram'
        fill
      />
    </div>
  );
}
