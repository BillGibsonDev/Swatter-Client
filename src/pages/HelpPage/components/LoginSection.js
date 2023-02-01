import styled from "styled-components";
import * as palette from '../../../styled/ThemeVariables.js';

export const LoginSection = () => {
  return (
    <StyledLoginSection>
      <article>
        <h2>Users</h2>
        <p>Freely login and out of Swatter with their username and password. Passwords are encrypted on the database for security purposes.</p>
      </article>
      <article>
        <h2>Admins</h2>
        <p>This is an elevated role meant for safeguarding projects and users. Admins have more permissions than users, including: creating and deleting projects, starting sprints and more.</p>
      </article>
    </StyledLoginSection>
  )
}

const StyledLoginSection = styled.section`
  article {
    margin-bottom: 20px;
    h2 {
      color: red;
    }
    p, li {
      color: white;
      font-size: .8em;
    }
    ul {
      list-style: square; 
      list-style-position: inside;
      li {
        margin: 10px 0;
        span {
            color: lightcoral;
        }
      }
    }
  }
`;