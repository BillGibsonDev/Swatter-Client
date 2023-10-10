import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

export const UnknownPath = () => {
  return (
    <StyledPage>
        <h1>404 Page Not Found</h1>
        <h2>It appears you are lost. Use the side menu to navigate to a known page or go back using the browser.</h2>
    </StyledPage>
  )
}

const StyledPage = styled.section`
width: 100%;
    h1, h2 {
        width: 100%;
        text-align: center;
        color: white;
    }
    h1 {
        font-size: 2em;
        margin-top: 10vh;
    }
    h2 {
        font-size: 1.2em;
        max-width: 70vh;
        margin: 20px auto;
        color: ${palette.helperGrey}
    }
`;