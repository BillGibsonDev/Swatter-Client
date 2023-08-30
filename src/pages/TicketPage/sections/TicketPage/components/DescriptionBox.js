import { marked } from "marked";

// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables.js";

export const DescriptionBox = ({ description }) => {

  return (
    <StyledDescription>
        <h3>Description:</h3>
        <div id='description' dangerouslySetInnerHTML={{  __html: marked(description)}}></div>
    </StyledDescription>
  );
}

const StyledDescription = styled.article`
  color: white;
  font-size: 1em;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  padding: 10px 0;
  h3 {
    color: ${palette.helperGrey};
  }
  p:not(:first-child) {
    margin-top: 10px;
  }
`;