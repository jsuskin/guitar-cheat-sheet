export interface MajorScaleKeySelector {
  selected: null | Note; // X
  setSelected: (note: null | Note) => void; // X
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
  0 | 1 | 2 | "all",
  0 | 1 | "all",
  0 | 1 | "all"
];

export interface Ball {
  active: boolean;
  typeFragmentNum: number;
  idx: number;
  rootNoteIdx: number;
  accidental: Accidental;
  modalDisplay: any;
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

export type Range_3 = 0 | 1 | 2;
export type Range_7 = Range_3 | 3 | 4 | 5 | 6;
export type Range_12 = Range_7 | 7 | 8 | 9 | 10 | 11;
