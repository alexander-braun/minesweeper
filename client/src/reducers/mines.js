import { SET_MINES } from '../actions/constants';

const mines = (state = [], action) => {
  switch (action.type) {
    case SET_MINES:
      return action.mines;
    default:
      return state;
  }
};

export default mines;
