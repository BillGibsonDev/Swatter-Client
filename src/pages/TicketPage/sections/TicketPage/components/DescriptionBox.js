import { marked } from "marked";

// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables.js";

export const DescriptionBox = ({ description }) => {

  return (
    <StyledDescription>
      <h2>Description</h2>
      <div id='description' dangerouslySetInnerHTML={{  __html: marked(description)}}></div>
    </StyledDescription>
  );
}

const StyledDescription = styled.article`
  color: white;
  font-size: 1em;
  margin: 20px 0;
  h2 {
    color: ${palette.helperGrey};
    font-weight: 400;
    font-size: .8em;
  }
  #description {
    color: black;
    padding: 4px;
    border: ${palette.accentBorder1px};
    border-radius: ${palette.borderRadius};
    min-height: 60px;
    background: ${palette.helperGrey};
    font-size: .8em;
  }
  p:not(:first-child) {
    margin-top: 10px;
  }
`;