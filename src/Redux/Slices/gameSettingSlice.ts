import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export type TSettings = {
  difficultValue: 'easy' | 'norm' | 'hard';
};

const initialState: TSettings = {
  difficultValue: 'norm',
};

export const gameSettingSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    changeDifficult(state, action) {
      state.difficultValue = action.payload;
    },
  },
});

export const selectSettings = (state: RootState) => state.gameSettingSlice;

export const { changeDifficult } = gameSettingSlice.actions;

export default gameSettingSlice.reducer;
