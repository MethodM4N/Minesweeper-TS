import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDifficult, selectSettings } from '../../../Redux/Slices/gameSettingSlice';
import MyPopup from '../../UI/MyPopup';

import './DifficultyPopup.scss';

type ChildrenProp = {
  isOpen: boolean;
  onClose: () => void;
};

const DifficultyPopup: React.FC<ChildrenProp> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [difficultyValue, setDifficultyValue] = useState('norm');
  const { difficultValue } = useSelector(selectSettings);
  const windowWidth = window.innerWidth;
  const width = {
    medium: windowWidth < 1065,
    mobile: windowWidth < 560,
  };

  useEffect(() => {
    if (width.medium) {
      dispatch(changeDifficult('norm'));
      setDifficultyValue('norm');
    }
    if (width.mobile) {
      dispatch(changeDifficult('easy'));
      setDifficultyValue('easy');
    } else {
      setDifficultyValue(difficultValue);
    }
  }, []);

  const changeDiffValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDifficultyValue(e.target.value);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(changeDifficult(difficultyValue));
    onClose();
  }

  return (
    <MyPopup
      title="Сложность"
      name="difficulty"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <section className="DifficultyPopup">
        <ul className="DifficultyPopup__top">
          <li></li>
          <li>H</li>
          <li>W</li>
          <li>Мины</li>
        </ul>
        <div className="DifficultyPopup__container">
          <div className="DifficultyPopup__flex">
            <div>
              <input
                type="radio"
                name="difficulty"
                id="easy"
                value={'easy'}
                onChange={(e) => changeDiffValue(e)}
                checked={difficultyValue === 'easy' ? true : false}></input>
              <label htmlFor="easy">Easy</label>
            </div>
            <div>
              <input
                type="radio"
                name="difficulty"
                id="norm"
                value={'norm'}
                disabled={width.mobile}
                onChange={(e) => changeDiffValue(e)}
                checked={difficultyValue === 'norm' ? true : false}
              />
              <label htmlFor="norm">Norm</label>
            </div>
            <div>
              <input
                type="radio"
                name="difficulty"
                id="hard"
                value={'hard'}
                disabled={width.mobile || width.medium}
                onChange={(e) => changeDiffValue(e)}
                checked={difficultyValue === 'hard' ? true : false}
              />
              <label htmlFor="hard">Hard</label>
            </div>
          </div>
          <div className="DifficultyPopup__grid">
            <ul>
              <li>8</li>
              <li>16</li>
              <li>32</li>
            </ul>
            <ul>
              <li>8</li>
              <li>16</li>
              <li>16</li>
            </ul>
            <ul>
              <li>10</li>
              <li>40</li>
              <li>100</li>
            </ul>
          </div>
        </div>
      </section>
    </MyPopup>
  );
};

export default DifficultyPopup;
