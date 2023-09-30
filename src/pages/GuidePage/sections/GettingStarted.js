import styled from "styled-components";
import * as palette from '../../../styled/ThemeVariables.js';

export const GettingStarted = () => {
  return (
    <StyledSection>
      <div className="features-wrapper">
        <h2 id="#Getting-Started">Getting Started</h2>
        <div className="features-container">
          <a href="#Projects">Create Projects</a>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="features-container">
          <a href="#Tickets">Create Tickets</a>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="features-container">
          <a href="#Sprints">Start Sprints</a>
          <p>Guide you and your team towards a goal. Start a sprint and designate tickets that need to be done to reach a 
            specific outcome. </p>
        </div>
        <div className="features-container">
          <a href="#">Communicate</a>
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
  .features-wrapper {
    width: 90%;
    margin: auto;
    h2 {
      margin-bottom: 20px;
      font-size: 1.5em;
      border-bottom: ${palette.accentBorder1px};
    }
    .features-container {
      margin-bottom: 20px;
      a {
        font-size: 1.2em;
        color: ${palette.accentColor};
      }
    }
  }
`;