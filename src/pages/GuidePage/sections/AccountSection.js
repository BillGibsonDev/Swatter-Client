import styled from "styled-components";
// import * as palette from '../../../styled/ThemeVariables.js';

export const AccountSection = () => {
  return (
    <StyledSection>
      <div className="wrapper">
        <h2 id="#Accounts">Accounts</h2>
        <div className="container">
          <h3 id="Create-Account">Create An Account</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="container">
          <h3 id="Update-Account">Update Account</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="container">
          <h3 id="Delete-Account">Delete Account</h3>
          <p>Guide you and your team towards a goal. Start a sprint and designate tickets that need to be done to reach a 
            specific outcome. </p>
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