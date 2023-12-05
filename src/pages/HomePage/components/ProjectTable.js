// styled
import styled from "styled-components";

// components
import Project from "./Project.js";
export const ProjectTable = ({ user, projects}) => {

  const sortByDate = (projects) => {
    return projects.sort((a, b) => {
      return new Date(b.lastUpdate) - new Date(a.lastUpdate);
    });
  };

  return (
    <StyledProjectTable>
      {
        sortByDate(projects).map((project, key) => {
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
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
`;
