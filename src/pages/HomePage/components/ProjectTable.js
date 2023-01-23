// styled
import styled from "styled-components";

// components
import Project from "./Project.js";

export const ProjectTable = ({projects}) => {

  return (
    <StyledProjectTable>
      {
        projects.slice().reverse().map((project, key) => {
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
    row-gap: 8px;
  }
`;
