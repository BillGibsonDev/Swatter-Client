// styled
import styled from "styled-components";

// components
import Project from "./Project.js";
export const ProjectTable = ({ user, projects}) => {
  const sortByDate = (projects) => {
    return projects.sort((a, b) => {
      return new Date(a.lastUpdate) - new Date(b.lastUpdate);
    });
  };

  return (
    <StyledProjectTable>
      {
        sortByDate(projects).slice().reverse().map((project, key) => {
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

const StyledProjectTable = styled.div`
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
`;
