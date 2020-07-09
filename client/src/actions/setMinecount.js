import { SET_MINECOUNT } from './constants';

const setMinecount = (minecount) => ({
  type: SET_MINECOUNT,
  minecount,
});

export default setMinecount;
