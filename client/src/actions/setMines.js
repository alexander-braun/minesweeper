import { SET_MINES } from './constants';

const setMines = (mines) => ({
  type: SET_MINES,
  mines,
});

export default setMines;
