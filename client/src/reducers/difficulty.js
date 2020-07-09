import { SET_DIFFICULTY } from '../actions/constants';

const difficulty = (state = 9, action) => {
  switch (action.type) {
    case SET_DIFFICULTY:
      return action.difficulty;
    default:
      return state;
  }
};

export default difficulty;
