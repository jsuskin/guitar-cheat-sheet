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

export const modePositionGroups = [
  [0, 2, 4], // Ionian
  [2, 4, 5], // Dorian
  [4, 5, 7], // Phrygian
  [5, 7, 9], // Lydian
  [7, 9, 11], // Mixolydian
  [9, 11, 0], // Aeolian
  [11, 0, 2], // Locrian
];

export const modesObj = Object.fromEntries(
  modes.map((modeName, idx) => [modeName, modePositionGroups[idx]])
);

export const correspondingModeNums = [
  [1, 4, 5],
  [2, 6],
  [3, 7],
].map((arr) => arr.map((n) => n - 1));

export const correspondingModeNames = correspondingModeNums.map((arr) =>
  arr.map((n) => modes[n])
);

export const majorScalePositions = [0, 2, 4, 5, 7, 9, 11];

export const stringXPositions = [
  "16.666666667",
  "325.0",
  "633.33333333",
  "941.66666667",
  "1250.0",
  "1558.33333333",
];

export const fretYPositions = [
  "20.0",
  "820.0",
  "1575.09945014535",
  "2287.81842465763",
  "2960.5355568606",
  "3595.49597764788",
  "4194.81880839855",
  "4760.50423334779",
  "5294.4401750158",
  "5798.40859497375",
  "6274.09144097484",
  "6723.07626029859",
  "7146.86149804231",
  "7546.86149804231",
  "7924.41122311498",
  "8280.77071037112",
  "8617.12927647261",
  "8934.60948686625",
  "9234.27090224158",
  "9517.1136147162",
  "9784.08158555021",
  "10036.0657955292",
  "10273.9072185297",
  "10498.3996281916",
  "10710.2922470635",
];

export const fretMidpoints: string[] = ((arr: string[] = []) => {
  for (let i = 0; i < fretYPositions.length - 1; i++) {
    const sum = +fretYPositions[i] + +fretYPositions[i + 1];
    const midpoint = sum / 2;
    arr.push(`${midpoint - 25}`);
  }
  return arr;
})();

export const tuning = [7, 0, 5, 10, 2, 7];

export const fretDotColors = [
  "#FF2323", // Red
  "#1DB52F", // Green
  "#B01BB3", // Purple
  "#ED8E11", // Orange
  "#E8EB34", // Yellow
  "#008080", // Teal
  "#FF7F50", // Coral
  "#6A5ACD", // Slate Blue
  "#DAA520", // Goldenrod
  "#2E8B57", // Sea Green
  "#FF6347", // Tomato
  "#DA70D6", // Orchid
  "#87CEEB", // Sky Blue
  "#D2691E", // Chocolate
  "#9370DB", // Medium Purple
];
