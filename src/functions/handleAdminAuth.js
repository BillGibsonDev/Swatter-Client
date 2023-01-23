export const handleAdminAuth = (user) => { 
    if (user.role === process.env.REACT_APP_ADMIN_SECRET){
        return true;
    } else {
        return false;
    }
}