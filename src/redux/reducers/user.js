import { HANDLE_USER } from '../constants/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_USER:
      return {
        ...action.payload
      };
    default:
      return {
        ...state
      };
    }
};

export default reducer;