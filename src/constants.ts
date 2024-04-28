import { Note } from "./types";

export const notesObj: { sharp: Note[]; flat: Note[] } = {
  sharp: ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯"],
  flat: ["A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭"],
};

export const notesJoined: Set<Note>[] = notesObj.sharp.map(
  (sharpNote: Note, idx: number) => {
    const flatNote: Note = notesObj.flat[idx];
    const set: Set<Note> = new Set();

    set.add(sharpNote);
    set.add(flatNote);

    return set;
  }
);

export const typeIntervals = ["W - W", "W - H", "H - W"];

export const modes = [
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian",
];

export const correspondingModeNums = [
  [1, 4, 5],
  [2, 6],
  [3, 7],
].map((arr) => arr.map((n) => n - 1));

export const correspondingModeNames = correspondingModeNums.map((arr) =>
  arr.map((n) => modes[n])
);

export const majorScalePositions = [0, 2, 4, 5, 7, 9, 11];
