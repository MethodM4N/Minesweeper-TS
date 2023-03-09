import { initialLeaderBoard } from '../constants/constants';

export const getLocalStorageLeaderBoard = () => {
  const data = localStorage.getItem('leaderBoard');
  const leaders = data ? JSON.parse(data) : initialLeaderBoard;
  return leaders;
};
