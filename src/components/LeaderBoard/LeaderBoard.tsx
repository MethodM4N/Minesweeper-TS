import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLeaderBoard } from '../../Redux/Slices/leaderBoardSlice';

import './LeaderBoard.scss';
import Leaders from './Leaders';

const LeaderBoard: React.FC = () => {
  const { easy, norm, hard } = useSelector(selectLeaderBoard);

  return (
    <section className="LeaderBoard">
      <Link to="/">Назад</Link>
      <div className="LeaderBoard__grid">
        <div>
          <h2>Hard</h2>
          {hard.map((obj, i) => (
            <Leaders key={i} {...obj} i={i} />
          ))}
        </div>
        <div>
          <h2>Norm</h2>
          {norm.map((obj, i) => (
            <Leaders key={i} {...obj} i={i} />
          ))}
        </div>
        <div>
          <h2>Easy</h2>
          {easy.map((obj, i) => (
            <Leaders key={i} {...obj} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeaderBoard;
