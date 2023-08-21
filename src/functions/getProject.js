import axios from "axios";

export const getProject = (user, projectId) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}`, {
        headers: { 
            Authorization: user.token
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
        console.log(err);
    });
};