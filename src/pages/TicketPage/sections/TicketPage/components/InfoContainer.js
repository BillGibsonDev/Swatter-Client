// styled
import styled from "styled-components";
import * as palette from '../../../../../styled/ThemeVariables.js';

// components
import { Timer } from "../../../../../components/Timer.js";

export const InfoContainer = ({ ticket }) => {

  return (
    <StyledArticle id="details">
      <h2><span>Creator:</span>{ticket.author}</h2>
      <h2><span>Assigned:</span>{ ticket.assigned ? ticket.assigned : 'No'}</h2>
      <h2><span>Created:</span><Timer date={ticket.date} /></h2>
      <h2><span>Updated:</span>{ ticket.lastUpdate ? <Timer date={ticket.lastUpdate} /> : 'No'}</h2>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-wrap: wrap;
  h2, h3 {
    color: white;
    font-size: .8em;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 4px 0;
    font-weight: 400;
    max-width: 185px;
    width: 100%;
    span {
      color: ${palette.helperGrey};
      font-weight: 400;
      margin-right: 4px;
    }
  }
`;