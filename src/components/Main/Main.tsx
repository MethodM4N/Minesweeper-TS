import React, { useEffect, useRef, useState } from 'react';

import Button from '../Button/Button';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import { generateCells, openAllEmptyCells } from '../../utils/utils';
import { Cell, CellState, CellValue, Face } from '../../types/types';
import { faceIco, gameAdjustments } from '../../constants/constants';

import './Main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addWinStats, selectLeaderBoard } from '../../Redux/Slices/leaderBoardSlice';
import { selectSettings } from '../../Redux/Slices/gameSettingSlice';
import Navbar from '../Navbar/Navbar';
import { getLocalStorageName } from '../../utils/getLocalStorageName';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(gameAdjustments.easy.NU_OF_BOMBS);
  const [bombValue, setBombValue] = useState<number>(gameAdjustments.norm.NU_OF_BOMBS);
  const [rowValue, setRowValue] = useState<number>(gameAdjustments.norm.MAX_ROWS);
  const [colValue, setColValue] = useState<number>(gameAdjustments.norm.MAX_COLS);
  const [cells, setCells] = useState<Cell[][]>([[]]);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const buttons = useRef<HTMLDivElement>(null);

  const { difficultValue } = useSelector(selectSettings);
  const leaderBoard = useSelector(selectLeaderBoard);

  useEffect(() => {
    if (difficultValue === 'easy') {
      setBombValue(gameAdjustments.easy.NU_OF_BOMBS);
      setRowValue(gameAdjustments.easy.MAX_ROWS);
      setColValue(gameAdjustments.easy.MAX_COLS);
    }
    if (difficultValue === 'hard') {
      setBombValue(gameAdjustments.hard.NU_OF_BOMBS);
      setRowValue(gameAdjustments.hard.MAX_ROWS);
      setColValue(gameAdjustments.hard.MAX_COLS);
    }
    if (difficultValue === 'norm') {
      setBombValue(gameAdjustments.norm.NU_OF_BOMBS);
      setRowValue(gameAdjustments.norm.MAX_ROWS);
      setColValue(gameAdjustments.norm.MAX_COLS);
    }
  }, [difficultValue]);

  useEffect(() => {
    const newCells = generateCells(colValue, rowValue, bombValue);
    setCells(newCells);
    setBombCounter(bombValue);
  }, [bombValue]);

  useEffect(() => {
    if (hasLost || hasWon) {
      return;
    }

    const handleMouseDown = (): void => {
      setFace(Face.oh);
    };

    const handleMouseUp = (): void => {
      setFace(Face.smile);
    };

    buttons.current?.addEventListener('mousedown', handleMouseDown);
    buttons.current?.addEventListener('mouseup', handleMouseUp);

    return () => {
      buttons.current?.removeEventListener('mousedown', handleMouseDown);
      buttons.current?.removeEventListener('mouseup', handleMouseUp);
    };
  }, [hasLost, hasWon]);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  useEffect(() => {
    if (hasLost) {
      setLive(false);
      setFace(Face.lost);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      const userName = getLocalStorageName();
      console.log(time);
      const data = { time, userName, difficultValue };
      dispatch(addWinStats(data));
      setLive(false);
      setBombCounter(0);
      setFace(Face.won);
      const json = JSON.stringify(leaderBoard);
      localStorage.setItem('leaderBoard', json);
    }
  }, [hasWon]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = cells.slice();

    if (hasLost || hasWon) {
      return;
    }

    if (!live) {
      let isABomb = newCells[rowParam][colParam].value === CellValue.bomb;
      while (isABomb) {
        newCells = generateCells(colValue, rowValue, bombValue);
        if (newCells[rowParam][colParam].value !== CellValue.bomb) {
          isABomb = false;
          break;
        }
      }
      setLive(true);
    }

    const currentCell = newCells[rowParam][colParam];

    if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      newCells = openAllEmptyCells(newCells, rowParam, colParam, colValue, rowValue);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
    }

    let safeOpenCellsExists = false;
    for (let row = 0; row < rowValue; row++) {
      for (let col = 0; col < colValue; col++) {
        const currentCell = newCells[row][col];

        if (currentCell.value !== CellValue.bomb && currentCell.state === CellState.hidden) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }

    if (!safeOpenCellsExists) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        }),
      );
      setHasWon(true);
    }

    setCells(newCells);
  };

  const handleCellRightClick =
    (rowParam: number, colParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      if (hasLost || hasWon) {
        return;
      }

      const currentCells = cells.slice();
      const currentCell = cells[rowParam][colParam];

      if (currentCell.state === CellState.visible) {
        return;
      } else if (currentCell.state === CellState.hidden) {
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);
        setBombCounter(bombCounter - 1);
      } else if (currentCell.state === CellState.flagged) {
        currentCells[rowParam][colParam].state = CellState.hidden;
        setCells(currentCells);
        setBombCounter(bombCounter + 1);
      }
    };

  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells(colValue, rowValue, bombValue));
    setHasLost(false);
    setHasWon(false);
    setBombCounter(bombValue);
    setFace(Face.smile);
  };

  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice();
    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible,
          };
        }

        return cell;
      }),
    );
  };

  return (
    <>
      <Navbar />
      <div className="Main">
        <div className="Header">
          <NumberDisplay value={bombCounter} />
          <button className="Face" onClick={handleFaceClick}>
            <img src={faceIco[face]} alt="bomb" />
          </button>
          <NumberDisplay value={time} />
        </div>
        <div
          ref={buttons}
          className={`Body ${
            difficultValue === 'norm'
              ? 'Body__norm'
              : difficultValue === 'hard'
              ? 'Body__hard'
              : 'Body__easy'
          }`}>
          {cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Button
                key={`${rowIndex}-${colIndex}`}
                onClick={handleCellClick}
                onRightClick={handleCellRightClick}
                red={cell.red}
                row={rowIndex}
                col={colIndex}
                state={cell.state}
                value={cell.value}
              />
            )),
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
