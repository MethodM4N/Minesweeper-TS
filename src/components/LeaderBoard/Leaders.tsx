import React from 'react';
import { TPlayer } from '../../Redux/Slices/leaderBoardSlice';

import './LeaderBoard.scss';

type TLeaders = {
  player: string;
  winTime: number;
  i: number;
};

const Leaders: React.FC<TLeaders> = ({ player, winTime, i }) => {
  return (
    <section className="Leaders">
      <p>{i + 1}.</p>
      <div className="Leaders__flex">
        <p>{player}</p>
        <p>{winTime} c</p>
      </div>
    </section>
  );
};

export default Leaders;
