import { Note, Mode, Accidental } from "@/types";
import { notesJoined, majorScalePositions, modesObj } from "@/constants";
import { rotateArray as _rotateArray } from "@/app/components/Fretboard/helper-methods";

export const getNoteIndex = (
  flat: Note[],
  sharp: Note[],
  root: Note,
  modeIndex: number
) =>
  Math.max(
    ...[flat, sharp].map(
      (arr) => (arr.indexOf(root) + majorScalePositions[modeIndex]) % 12
    )
  );

export const rotateArray = (pivot: number, arr: any) => {
  const rotated = [pivot, 0]
    .map((val, idx, self) => arr.slice(val, ...[self[--idx]]))
    .flat();
  return rotated;
};

export const getNotesFromRoot = (
  rootNoteNum: number,
  notesJoined: Set<Note>[],
  modeIndex: number
) =>
  rotateArray((rootNoteNum + majorScalePositions[modeIndex]) % 12, notesJoined);

export const filterByAccidental = (accidental: Accidental) => (note: Note) =>
  note.length < 2 || note[1] === (accidental === "sharp" ? "♯" : "♭");

export const getActiveNotes = (sets: Set<Note>[], accidental: Accidental) =>
  sets.map((set: any) => [...set].filter(filterByAccidental(accidental)).pop());

export const getPatternsArray = (...args: string[]) =>
  [...args].reduce((acc, cur) => {
    return { ...acc, [cur]: modesObj[cur] };
  }, {});

export const zeroBase = (n: number, _: never, self: number[]) => n - self[0];
