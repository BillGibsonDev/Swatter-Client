// styled
import styled from "styled-components";

// functions
import { handleDate } from "../../../../../functions/handleDates";

export const InfoContainer = ({ ticket }) => {

  return (
    <StyledArticle>
        <h2><span>Creator: </span>{ticket.author}</h2>
        <h2><span>Assigned User: </span>{ ticket.assigned ? ticket.assigned : 'None'}</h2>
        <h2><span>Created: </span>{handleDate(ticket.date)}</h2>
        <h2><span>Updated: </span>{handleDate(ticket.lastUpdate)}</h2>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
    width: 50%;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media (max-width: 450px) {
        width: 100%;
    }
    h2 {
        color: white;
        font-size: 1em;
        display: flex;
        margin: 4px 6px 4px 0;
        font-weight: 400;
        span {
            color: #cecece;
            font-weight: 400;
            font-size: 1em;
            margin-right: 6px;
        }
    }
`;