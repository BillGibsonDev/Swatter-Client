import { SHOW_ALERT, HIDE_ALERT } from '../constants/actionTypes.js';

export const showAlert = ( type, message ) => {
  return {
    type: SHOW_ALERT,
    payload: {
      type,
      message
    },
  };
}

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
}
