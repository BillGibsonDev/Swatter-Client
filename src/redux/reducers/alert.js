
import { SHOW_ALERT, HIDE_ALERT } from "../constants/actionTypes";
const initialState = {
  message: '',
  type: '',
  isVisible: false,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...action.payload
      };
    case HIDE_ALERT:
      return initialState;
    default:
      return state;
  }
};

export default alertReducer;