// styled
import styled from "styled-components";
import * as palette from '../../../../../styled/ThemeVariables.js';

// functions
import { handleElapsedTime } from "../../../../../functions/handleDates";

export const InfoContainer = ({ ticket }) => {

  return (
    <StyledArticle id="details">
      <h2><span>Creator:</span>{ticket.author}</h2>
      <h2><span>Assigned:</span>{ ticket.assigned ? ticket.assigned : 'No'}</h2>
      <h2><span>Created:</span>{handleElapsedTime(ticket.date)}</h2>
      {
        ticket.lastUpdate ? <h2><span>Updated:</span>{handleElapsedTime(ticket.lastUpdate)}</h2>
        : <></>
      }
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-wrap: wrap;
  h2 {
    color: white;
    font-size: .8em;
    display: flex;
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