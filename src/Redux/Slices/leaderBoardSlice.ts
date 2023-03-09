import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageLeaderBoard } from '../../utils/getLocalStorageLeaderBoard';
import { RootState } from '../Store';

export type TPlayer = {
  player: string;
  winTime: number;
};

interface ILeaderBoardSlice {
  easy: TPlayer[];
  norm: TPlayer[];
  hard: TPlayer[];
}

const { easy, norm, hard } = getLocalStorageLeaderBoard();

const initialState: ILeaderBoardSlice = {
  easy,
  norm,
  hard,
};

export const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    addWinStats(state, action) {
      if (action.payload.difficultValue === 'easy') {
        const player = action.payload.userName;
        const winTime = action.payload.time;
        const newLeaderBoard = state.easy;
        newLeaderBoard.push({ player, winTime });
        newLeaderBoard
          .sort((a, b) => {
            if (a.winTime > b.winTime) {
              return 1;
            }
            if (a.winTime < b.winTime) {
              return -1;
            }
            return 0;
          })
          .splice(-1, 1);
        state.easy = newLeaderBoard;
      }
      if (action.payload.difficultValue === 'norm') {
        const player = action.payload.userName;
        const winTime = action.payload.time;
        const newLeaderBoard = state.norm;
        newLeaderBoard.push({ player, winTime });
        newLeaderBoard
          .sort((a, b) => {
            if (a.winTime > b.winTime) {
              return 1;
            }
            if (a.winTime < b.winTime) {
              return -1;
            }
            return 0;
          })
          .splice(-1, 1);
        state.norm = newLeaderBoard;
      }
      if (action.payload.difficultValue === 'hard') {
        const player = action.payload.userName;
        const winTime = action.payload.time;
        const newLeaderBoard = state.hard;
        newLeaderBoard.push({ player, winTime });
        newLeaderBoard
          .sort((a, b) => {
            if (a.winTime > b.winTime) {
              return 1;
            }
            if (a.winTime < b.winTime) {
              return -1;
            }
            return 0;
          })
          .splice(-1, 1);
        state.hard = newLeaderBoard;
      }
      getLocalStorageLeaderBoard();
    },
  },
});

export const selectLeaderBoard = (state: RootState) => state.leaderBoardSlice;

export const { addWinStats } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;
