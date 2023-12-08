import axios from "axios"
import { handleLogout, handleUser, } from "../redux/actions/user";
import { handleTokens } from "./handleTokens";

export const refreshLogin = ( dispatch ) => {
    let user = {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        id: localStorage.getItem("id")
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/users/${user.id}/validate-tokens`, {} , {
        headers: {
            Authorization: user.token
        }
    })
    .then((response) => {
        handleTokens(response.data.token, response.data.username, response.data.id);
        dispatch(handleUser( response.data.token, response.data.username, response.data.id ));
    })
    .catch((error) => {
        console.log(error);
        dispatch(handleLogout());
    })
}