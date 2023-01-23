export const handleAuthor = (author, user) => {
  if (author === user.username){
    return true;
  } else if (user.role === process.env.REACT_APP_ADMIN_SECRET){
    return true;
  } else {
    return false;
  }
}