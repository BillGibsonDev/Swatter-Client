import styled from "styled-components";
import * as palette from '../../styled/ThemeVariables.js';

export const FeaturesPage = () => {
  return (
    <StyledFeatures>
      <header className="title-container">
        <h1>Swatter Project Management</h1>
        <p>Project management is the goal of Swatter. Organizing and paving the way to meet your goals and create better outcomes. </p>
        <h2>Features</h2>
      </header>
      <div className="features-wrapper">
        <div className="features-container">
          <h3>Create Issues</h3>
          <p>Track issues, tasks and more easily on your project's page. Search and sort issues with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="features-container">
          <h3>Start Sprints</h3>
          <p>Guide you and your team towards a goal. Start a sprint and designate issues that need to be done to reach a 
            specific outcome. </p>
        </div>
        <div className="features-container">
          <h3>Communicate</h3>
          <p>Leave comments to add notes or communicate with team mates. You can leave a comment on the project as a whole or on the specific issue you are working on.</p>
        </div>
        <div className="features-container">
          <h3>Archive</h3>
          <p>When issues haven't been updated in over 30 days, the are sent to the archive. This helps clean up the initial project issue table. To move an issue back to the main project table, simply update it.</p>
        </div>
      </div>
    </StyledFeatures>
  )
}

const StyledFeatures = styled.section`
  width: 60%;
  margin: 20px auto;
  @media (max-width: 834px){
    width: 70%;
    text-align: center;
  }
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