export const toggleRef = (ref) => {
  let section = ref.current;
  if (section.style.display === "none") {
    section.style.display = "flex";
  } else {
    section.style.display = "none";
  }
};