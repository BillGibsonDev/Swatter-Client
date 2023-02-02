import { HANDLE_USER } from '../constants/actionTypes.js';

export const handleUser = ( username, role, token ) => {
  return {
    type: HANDLE_USER,
    payload: {
      username,
      role,
      token
    },
  };
}
