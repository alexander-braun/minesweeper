import { SET_REVEALED_ARR } from './constants';

const setRevealedArr = (revealedArr) => ({
  type: SET_REVEALED_ARR,
  revealedArr,
});

export default setRevealedArr;
