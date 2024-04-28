import { Note, Mode, Accidental } from "@/types";
import { notesObj, majorScalePositions } from "@/constants";

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

export const rotateArray = (pivot: number, arr: Set<Note>[] | number[]) => [pivot, 0].map((val, idx, self) =>
    arr.slice(val, ...[self[--idx]])
  );

export const getNotesFromRoot = (
  rootNoteNum: number,
  notesJoined: Set<Note>[],
  modeIndex: number
) => {
  const pivot = (rootNoteNum + majorScalePositions[modeIndex]) % 12;
  const [left, right] = rotateArray(pivot, notesJoined);
  return [...left, ...right];
};

export const filterByAccidental = (accidental: Accidental) => (note: Note) =>
  note.length < 2 || note[1] === (accidental === "sharp" ? "♯" : "♭");

export const getActiveNotes = (sets: Set<Note>[], accidental: Accidental) =>
  sets.map((set: any) => [...set].filter(filterByAccidental(accidental)).pop());
