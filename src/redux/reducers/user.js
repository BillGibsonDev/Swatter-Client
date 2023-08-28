import { HANDLE_USER, LOGOUT } from '../constants/actionTypes';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_USER:
      return {
        ...action.payload
      };
    case LOGOUT:
      return {
        initialState
      };
    default:
      return {
        ...state
      };
    }
};

export default userReducer;