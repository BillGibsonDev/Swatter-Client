import styled from "styled-components";
// import * as palette from '../../../styled/ThemeVariables.js';

export const ProjectSection = () => {
  return (
    <StyledSection>
      <div className="wrapper">
        <h2 id="Projects">Projects</h2>
        <div className="container">
          <h3 id="Create-A-Project">Creating A Project</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="container">
          <h3 id="Project-Menu">Project Menu</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="container">
          <h3 id="Project-Pages">Project Pages</h3>
          <p>Guide you and your team towards a goal. Start a sprint and designate tickets that need to be done to reach a 
            specific outcome. </p>
        </div>
        <div className="container">
          <h3 id="Edit-A-Project">Editing A Project</h3>
          <p>Guide you and your team towards a goal. Start a sprint and designate tickets that need to be done to reach a 
            specific outcome. </p>
        </div>
        <div className="container">
          <h3 id="Adding-Members">Adding Members</h3>
          <p>Leave comments to add notes or communicate with team mates. You can leave a comment on the project as a whole or on the specific ticket you are working on.</p>
        </div>
      </div>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  margin: 10px;
  display: flex;
  position: relative;
`;