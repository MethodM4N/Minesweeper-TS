import smileIco from '../assets/img/smileIco.png';
import ohIco from '../assets/img/ohIco.png';
import lostIco from '../assets/img/lostIco.png';
import wonIco from '../assets/img/wonIco.png';

export const gameAdjustments = {
  easy: {
    MAX_ROWS: 8,
    MAX_COLS: 8,
    NU_OF_BOMBS: 1,
  },
  norm: {
    MAX_ROWS: 16,
    MAX_COLS: 16,
    NU_OF_BOMBS: 2,
  },
  hard: {
    MAX_ROWS: 16,
    MAX_COLS: 32,
    NU_OF_BOMBS: 1,
  },
};

export const initialLeaderBoard = {
  easy: [
    { player: 'Федя', winTime: 2 },
    { player: 'Артем', winTime: 4 },
    { player: 'Степа', winTime: 6 },
    { player: 'John', winTime: 7 },
    { player: 'Федя', winTime: 8 },
  ],
  norm: [
    { player: 'Федя', winTime: 12 },
    { player: 'Артем', winTime: 14 },
    { player: 'Степа', winTime: 16 },
    { player: 'Витя', winTime: 17 },
    { player: 'Федя', winTime: 18 },
  ],
  hard: [
    { player: 'Федя', winTime: 112 },
    { player: 'Артем', winTime: 114 },
    { player: 'Степа', winTime: 116 },
    { player: 'Гена', winTime: 117 },
    { player: 'Федя', winTime: 118 },
  ],
};

export const faceIco = [smileIco, ohIco, lostIco, wonIco];
