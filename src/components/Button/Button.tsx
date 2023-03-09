import React from 'react';
import { CellState, CellValue } from '../../types/types';
import bombIco from '../../assets/img/bombIco.png';
import flagIco from '../../assets/img/flagIco.png';

import './Button.scss';

interface ButtonProps {
  col: number;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onRightClick(rowParam: number, colParam: number): (...args: any[]) => void;
  red?: boolean;
  row: number;
  state: CellState;
  value: CellValue;
}

const Button: React.FC<ButtonProps> = ({ col, onClick, onRightClick, red, row, state, value }) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <img src={bombIco} alt="bomb" />;
      } else if (value === CellValue.none) {
        return null;
      }

      return value;
    } else if (state === CellState.flagged) {
      return <img src={flagIco} alt="flag" />;
    }

    return null;
  };

  return (
    <button
      className={`Button ${state === CellState.visible ? 'visible' : ''} value_${value} ${
        red ? 'red' : ''
      }`}
      onClick={onClick(row, col)}
      onContextMenu={onRightClick(row, col)}>
      {renderContent()}
    </button>
  );
};

export default Button;
