export const handleUserAuth = ( user ) => {
  if (user.role === process.env.REACT_APP_ADMIN_SECRET){
    return true;
  } else if (user.role === process.env.REACT_APP_USER_SECRET) {
    return true;
  } else {
    return false;
  }
}