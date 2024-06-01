import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface FretboardState {
  queue: any;
  patternsArray: any;
}

// Define the initial state using that type
const initialState: FretboardState = {
  queue: [],
  patternsArray: [[], [], []],
};

export const fretboardSlice = createSlice({
  name: "fretboard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // setPatternsArray: (state, action: PayloadAction<number[][]>) => {
    setPatternsArray: (state, action: PayloadAction<any>) => {
      console.log({
        patternsArray: state.patternsArray,
        payload: action.payload,
      });
      state.patternsArray = action.payload;
    },
  },
});

export const { setPatternsArray } = fretboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getPatternsArray = (state: RootState) =>
  state.fretboard.patternsArray;

export default fretboardSlice.reducer;
