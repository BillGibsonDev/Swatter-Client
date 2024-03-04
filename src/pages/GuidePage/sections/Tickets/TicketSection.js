import styled from "styled-components";
import { Types } from "./Types";
import { TimeAppraisal } from "./TimeAppraisal";
// import * as palette from '../../../styled/ThemeVariables.js';

export const TicketSection = () => {
  return (
    <StyledSection>
      <div className="wrapper">
        <h2 id="Tickets">Tickets</h2>
        <div className="container">
          <h3 id="Creating-Tickets">Creating Tickets</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="container">
          <h3 id="Editing-Tickets">Editing Tickets</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="container">
          <h3 id="Comments-For-Tickets">Comments for Tickets</h3>
          <p>Guide you and your team towards a goal. Start a sprint and designate tickets that need to be done to reach a 
            specific outcome. </p>
        </div>
        <Types />
        <TimeAppraisal />
      </div>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  margin: 10px;
  display: flex;
  position: relative;
`;