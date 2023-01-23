// styled
import styled from "styled-components";

// components
import Project from "./Project.js";

export const SearchProjectTable = ({ projects, projectSearchPhrase }) => {

  const handleSearch = () => {
    let projectArray = [];
    if(projectSearchPhrase){
      let x = projects.length;
      for ( let i = 0; x > i; i++ ){
        let array = projectArray;
        let projectObject = projects[i];
        let index = array.findIndex(project => project._id === projectObject._id)
        if( index < 0){
          Object.keys(projectObject).forEach((key) => {
            let string = `${projectObject[key]}`;
            string = string.toLowerCase();
            if(string.includes(projectSearchPhrase.toLowerCase())){
              if(array.findIndex(project => project._id === projectObject._id) < 0){
                projectArray.push(projects[i])
              }
            }
          })
        }
      }
      return projectArray;
      } else {
        projectArray = projects.slice().reverse()
        return projectArray;
      }
    }

   const filteredProjects = handleSearch();

  return (
    <StyledProjectTable>
      {
        filteredProjects.slice().reverse().map((project, key) => {
          return (
            <Project
              project={project}
              key={key}
            />
          );
        })
      } 
    </StyledProjectTable>
  );
}

const StyledProjectTable = styled.div`
  width: 100%;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  @media (max-width: 1050px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 450px) {
    grid-template-columns: 75vw;
    row-gap: 20px;
  }
`;
