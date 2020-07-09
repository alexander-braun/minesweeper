import { SET_REVEALED } from './constants';

const setRevealed = (revealed) => ({
  type: SET_REVEALED,
  revealed,
});

export default setRevealed;
