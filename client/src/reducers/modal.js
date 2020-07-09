import { TOGGLE_MODAL } from '../actions/constants';

const modal = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return action.modal;
    default:
      return state;
  }
};

export default modal;
