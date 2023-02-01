import styled from "styled-components";
import * as palette from '../../styled/ThemeVariables.js';
import { LoginSection } from "./components/LoginSection.js";
import { ProjectSection } from "./components/ProjectSection.js";

export const HelpPage = () => {
  return (
    <StyledHelpPage>
      <header className="title-container">
        <h1>Swatter - Project Management</h1>
        <p>Project management is the goal of Swatter. Organizing and paving the way to meet your goals and create better outcomes. </p>
      </header>
      <LoginSection />
      <ProjectSection />
    </StyledHelpPage>
  )
}

const StyledHelpPage = styled.section`
  width: 70%;
  margin: 20px auto;
  .title-container {
    margin-bottom: 20px;
    h1, p {
      color: white;
    }
  }
`;