// styled
import styled from "styled-components";

// functions
import { handleDate } from "../../../../../functions/handleDates";

export const InfoContainer = ({ticket, setAssigned}) => {
  return (
    <StyledTicketSection>
      <h2><span>Creator: </span>{ticket.author}</h2>
      <h2><span>Created: </span>{handleDate(ticket.date)}</h2>
      <h2><span>Updated: </span>{handleDate(ticket.lastUpdate)}</h2>
    </StyledTicketSection>
  );
}

const StyledTicketSection = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0 10px 0;
  @media (max-width: 700px) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  }
  h2 {
    color: white;
    font-size: 1em;
    display: flex;
    width: 90%;
    font-weight: 400;
    margin: 6px 0;
    span {
      color: #cecece;
      font-weight: 400;
      font-size: 1em;
      margin-right: 6px;
    }
  }
`;