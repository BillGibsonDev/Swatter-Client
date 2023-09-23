// styled
import styled from "styled-components";
import * as palette from '../../../../../styled/ThemeVariables.js';

// functions
import { handleDate } from "../../../../../functions/handleDates";

export const InfoContainer = ({ ticket }) => {

  return (
    <StyledArticle id="details">
        <h2><span>Creator </span>{ticket.author}</h2>
        <h2><span>Assigned </span>{ ticket.assigned ? ticket.assigned : 'None'}</h2>
        <h2><span>Created </span>{handleDate(ticket.date)}</h2>
        <h2><span>Updated </span>{handleDate(ticket.lastUpdate)}</h2>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: flex-start;
    text-align: center;
    justify-content: space-between;
    h2 {
        color: white;
        font-size: .8em;
        display: flex;
        flex-direction: column;
        margin: 4px 6px 4px 0;
        font-weight: 400;
        span {
            color: ${palette.helperGrey};
            font-weight: 400;
            margin-right: 6px;
        }
    }
`;