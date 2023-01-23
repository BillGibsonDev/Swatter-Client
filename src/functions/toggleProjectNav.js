export const toggleProjectSideNav = (ref) => {
  let section = ref.current;
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
};