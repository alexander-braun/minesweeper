import { SET_MINECOUNT } from '../actions/constants';

const minecount = (state = 0, action) => {
  switch (action.type) {
    case SET_MINECOUNT:
      return action.minecount;
    default:
      return state;
  }
};

export default minecount;
