import { SET_REVEALED, SET_REVEALED_ARR } from '../actions/constants';

const initialState = [];

const revealed = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_REVEALED:
      newState = state.slice(0);
      newState[action.revealed] = !state[action.revealed] || true;
      return newState;
    case SET_REVEALED_ARR:
      newState = action.revealedArr.slice(0);
      return newState;
    default:
      return state;
  }
};

export default revealed;
