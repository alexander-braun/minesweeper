import { SET_TIME } from './constants';

const setTime = (time) => ({
  type: SET_TIME,
  time,
});

export default setTime;
