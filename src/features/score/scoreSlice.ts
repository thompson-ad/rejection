import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    value: 0,
  },
  reducers: {
    incrementOne: (state) => {
      state.value += 1;
    },
    incrementTen: (state) => {
      state.value += 10;
    },
  },
});

export const { incrementOne, incrementTen } = scoreSlice.actions;

export const selectScore = (state: RootState): number => state.score.value;

export default scoreSlice.reducer;
