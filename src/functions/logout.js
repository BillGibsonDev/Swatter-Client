import { handleLogout } from "../redux/actions/user";

export const logout = ( dispatch, navigate ) => {
    localStorage.clear();
    dispatch(handleLogout());
    navigate('/');
}