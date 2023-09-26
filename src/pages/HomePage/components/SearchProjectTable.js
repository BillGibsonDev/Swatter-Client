// styled
import styled from "styled-components";

// components
import Project from "./Project.js";

export const SearchProjectTable = ({ user, projects, projectSearchPhrase }) => {

  const handleSearch = () => {
    let projectArray = [];
    if(projectSearchPhrase){
      for ( let i = 0; projects.length > i; i++ ){
        let projectObject = projects[i];
        let arrayIndex = projectArray.findIndex(project => project._id === projectObject._id)
        if( arrayIndex < 0){
          Object.keys(projectObject).forEach((key) => {
            let string = `${projectObject[key]}`;
            string = string.toLowerCase();
            if(string.includes(projectSearchPhrase.toLowerCase())){
              if(projectArray.findIndex(project => project._id === projectObject._id) < 0){
                projectArray.push(projects[i])
              }
            }
          })
        }
      }
      return projectArray;
    } else {
      let array = projects.slice().reverse()
      return array;
    }
  }

  const filteredProjects = handleSearch();

  return (
    <StyledProjectTable>
      {
        filteredProjects.slice().reverse().map((project, key) => {
          return (
            <Project
              user={user}
              project={project}
              key={key}
            />
          );
        })
      } 
    </StyledProjectTable>
  );
}

const StyledProjectTable = styled.section`
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
`;
