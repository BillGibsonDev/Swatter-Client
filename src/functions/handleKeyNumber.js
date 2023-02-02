export const handleKeyNumber = (key) => {
  let result = "";
  let characters =
    "0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return `${key}-${result}`;
};