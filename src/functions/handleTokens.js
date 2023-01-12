export const handleTokens = (token, username) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
};