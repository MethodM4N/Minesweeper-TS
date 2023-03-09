import { configureStore } from '@reduxjs/toolkit';
import leaderBoardSlice from './Slices/leaderBoardSlice';
import { useDispatch } from 'react-redux';
import gameSettingSlice from './Slices/gameSettingSlice';

export const store = configureStore({
  reducer: {
    leaderBoardSlice,
    gameSettingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
