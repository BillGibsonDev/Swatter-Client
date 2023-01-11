export const handleTokens = (token, username) => {
    sessionStorage.setItem("token", token);
    localStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    localStorage.setItem("username", username);
};