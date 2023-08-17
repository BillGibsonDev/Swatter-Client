import { HANDLE_USER } from '../constants/actionTypes.js';

export const handleUser = ( username, id, token ) => {
  return {
    type: HANDLE_USER,
    payload: {
      username,
      id,
      token
    },
  };
}
