// styled
import styled from "styled-components";

// components
import SprintTicketTable from "../components/SprintTicketTable.js";
import { TitleContainer } from "../components/TitleContainer";
import { SprintSectionButtons } from "../components/SprintSectionButtons";

export const SprintSection = ({ 
    project, 
    searchSprint, 
    options, 
    setCreating, 
    setSearchSprint, 
    setEditing 
}) => {

  return (
    <StyledSection>
        <SprintSectionButtons 
            options={options} 
            setCreating={setCreating} 
            setSearchSprint={setSearchSprint}
        />
        <TitleContainer
            sprint={project.sprints.find((sprint) => sprint.title === searchSprint)}
            setEditing={setEditing}
        />
        <SprintTicketTable
            project={project}
            searchSprint={searchSprint}
        />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  height: 100%;
  max-height: 80vh;
  width: 100%;
  .button-wrapper {
    display: flex;
    width: auto;
    button {
      margin: 0 4px;
      height: 30px;
    }
    select {
      margin: 0;
      cursor: pointer;
      height: 30px;
      width: 200px;
      padding-left: 4px;
      option {
        font-size: 1em;
      }
    }
  }
`;