export const handleTokens = (token, username, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("id", id);
};