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
  padding: 10px 0;
  h2 {
    color: ${palette.helperGrey};
    border-bottom: ${palette.greyBorder};
    margin-bottom: 6px;
    font-weight: 400;
    font-size: .8em;
  }
  p:not(:first-child) {
    margin-top: 10px;
  }
`;