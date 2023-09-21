import styled from "styled-components";
import * as palette from '../../styled/ThemeVariables.js';

export const FeaturesPage = () => {
  return (
    <StyledPage>
      <header className="title-container">
        <h1>Swatter Project Management</h1>
        <p>Project management is the goal of Swatter. Organizing and paving the way to meet your goals and create better outcomes. </p>
        <h2>Features</h2>
      </header>
      <div className="features-wrapper">
        <div className="features-container">
          <h3>Create Tickets</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="features-container">
          <h3>Start Sprints</h3>
          <p>Guide you and your team towards a goal. Start a sprint and designate tickets that need to be done to reach a 
            specific outcome. </p>
        </div>
        <div className="features-container">
          <h3>Communicate</h3>
          <p>Leave comments to add notes or communicate with team mates. You can leave a comment on the project as a whole or on the specific ticket you are working on.</p>
        </div>
        <div className="features-container">
          <h3>Archive</h3>
          <p>When tickets haven't been updated in over 30 days, the are sent to the archive. This helps clean up the initial project ticket table. To move an ticket back to the main project table, simply update it.</p>
        </div>
      </div>
    </StyledPage>
  )
}

const StyledPage = styled.section`
  width: 80%;
  margin: 20px auto;
  max-width: 1000px;
  h1, h2 {
    color: white;
  }
  p {
    color: ${palette.helperGrey};
    font-size: .8em;
  }
  .title-container {
    margin-bottom: 20px;
    text-align: center;
    h1 {
      font-size: 2em;
    }
    p {
      max-width: 600px;
      margin: auto;
    }
    h2 {
      font-size: 2em;
      margin-top: 40px;
      border-bottom: 2px solid ${palette.accentColor};
      width: 50%;
      margin: 40px auto;
    }
  }
  .features-wrapper {
    .features-container {
      margin-bottom: 40px;
      h3 {
        font-size: 1.5em;
        color: ${palette.accentColor};
        margin-bottom: 8px;
      }
    }
  }
`;