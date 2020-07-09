import { SET_GRID } from '../actions/constants';

const grid = (state = [], action) => {
  switch (action.type) {
    case SET_GRID:
      return action.grid;
    default:
      return state;
  }
};

export default grid;
