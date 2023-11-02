import styled from "styled-components";
import * as palette from '../../../styled/ThemeVariables.js';

export const IntroSection = () => {
  return (
    <StyledSection>
      <div className="wrapper">
        <h2 id="Introduction">Introduction</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Voluptas nobis aspernatur cupiditate ducimus facere beatae voluptatum, temporibus corporis amet autem molestiae, dignissimos ab exercitationem rem cumque, 
          veritatis maxime explicabo sint! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Eos ipsum, atque vero ratione libero unde expedita? Inventore labore eaque ducimus voluptas, 
          maxime laborum natus sunt aliquid porro, consectetur minus dolores.
        </p>

        <h4>Features</h4>
        <div className="container">
          <h3>Create Projects</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="container">
          <h3>Create Tickets</h3>
          <p>Track tickets, tasks and more easily on your project's page. Search and sort tickets with ease with our easy to read layout and search bar.</p>
        </div>
        <div className="container">
          <h3>Start Sprints</h3>
          <p>Guide you and your team towards a goal. Start a sprint and designate tickets that need to be done to reach a 
            specific outcome. </p>
        </div>
        <div className="container">
          <h3 href="#">Communicate</h3>
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
  h4 {
    color: white;
    font-size: 1.2em;
    margin: 20px 0 6px 0;
    width: 30%;
    border-bottom: ${palette.accentBorder1px};
  }
`;