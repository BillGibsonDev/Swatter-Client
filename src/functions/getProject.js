import axios from "axios";

export const getProject = async (user, projectId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}`,
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    return error;
  }
};