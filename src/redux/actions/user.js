import { HANDLE_USER } from '../constants/actionTypes.js';

export const handleUser = ( token, username, id ) => {
  return {
    type: HANDLE_USER,
    payload: {
      token,
      username,
      id,
    },
  };
}
