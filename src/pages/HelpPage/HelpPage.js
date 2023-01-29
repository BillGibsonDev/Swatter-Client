import styled from "styled-components"

export const HelpPage = () => {
  return (
    <StyledHelpPage>
      <h1>Swatter</h1>
      <h2>Manage Projects</h2>
      <p>Project management is the goal of Swatter. Organizing and paving the way to meet your goals and create better outcomes. </p>
    </StyledHelpPage>
  )
}

const StyledHelpPage = styled.article`
  width: 70%;
  margin: 20px auto;
  h1, h2, p {
    color: white;
  }
`;