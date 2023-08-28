import { HANDLE_USER, LOGOUT } from '../constants/actionTypes.js';

export const handleUser = ( token, username, id ) => {
  return {
    type: HANDLE_USER,
    payload: {
      token,
      username,
      id
    },
  };
}

export const handleLogout = () => {
  return {
    type: LOGOUT,
  };
}
