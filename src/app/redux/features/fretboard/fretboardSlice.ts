import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type ModalDisplay = number | "all"
type ModalDisplayList = ModalDisplay[];

// Define a type for the slice state
interface FretboardState {
  queue: [] | number[][];
  patternsArray: number[][];
  modalDisplayList: ModalDisplayList;
}

// Define the initial state using that type
const initialState: FretboardState = {
  queue: [],
  patternsArray: [[], [], []],
  modalDisplayList: [0, 0, 0],
};

export const fretboardSlice = createSlice({
  name: "fretboard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPatternsArray: (state, action: PayloadAction<number[][]>) => {
      state.patternsArray = action.payload;
    },
    hidePatterns: (state, action: PayloadAction<any>) => {},
    setModalDisplayList: (
      state,
      action: PayloadAction<[number, number | "all"]>
    ) => {
      const [listIndex, modeIndex] = action.payload;

      const listCopy = [...state.modalDisplayList];
      listCopy[listIndex] = modeIndex;

      state.modalDisplayList = listCopy;
    },
  },
});

export const { setPatternsArray, setModalDisplayList } = fretboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getPatternsArray = (state: RootState) =>
  state.fretboard.patternsArray;

export default fretboardSlice.reducer;
