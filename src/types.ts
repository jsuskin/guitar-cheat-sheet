export interface MajorScaleKeySelector {
  noteNum: number;
  setNoteNum: (prevNum: number | ((prev: number) => number)) => void;
  accidental: Accidental;
  setAccidental: (accidental: Accidental) => void;
}

export interface TypeFragmentDynamicProps {
  type: 1 | 2 | 3;
  activeList: number[];
}

export interface TypeFragment extends TypeFragmentDynamicProps {
  rootNoteIdx: number;
  accidental: Accidental;
  modalDisplay: any;
  setModalDisplayList: (
    prev: ModalDisplayList | ((prev: ModalDisplayList) => ModalDisplayList)
  ) => void;
}

export type ModalDisplayList = [
  Range_3 | "all",
  Range_2 | "all",
  Range_2 | "all"
];

export interface Ball {
  active: boolean;
  typeFragmentNum: number;
  ballIdx: Range_5;
  rootNoteIdx: number;
  accidental: Accidental;
  modalDisplay: any;
  hover: any;
  setHover: any;
}

export type Accidental = "sharp" | "flat";

export type Note =
  | "A"
  | "A♯"
  | "B♭"
  | "B"
  | "C"
  | "C♯"
  | "D♭"
  | "D"
  | "D♯"
  | "E♭"
  | "E"
  | "F"
  | "F♯"
  | "G♭"
  | "G"
  | "G♯"
  | "A♭";

export type Mode =
  | "Ionian"
  | "Dorian"
  | "Phrygian"
  | "Lydian"
  | "Mixolydian"
  | "Aeolian"
  | "Locrian";

export type Range_2 = 0 | 1;
export type Range_3 = Range_2 | 2;
export type Range_5 = Range_3 | 3 | 4;
export type Range_7 = Range_5 | 5 | 6;
export type Range_12 = Range_7 | 7 | 8 | 9 | 10 | 11;
