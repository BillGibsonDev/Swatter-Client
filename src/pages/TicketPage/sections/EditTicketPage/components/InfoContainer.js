// styled
import styled from "styled-components";
import * as palette from '../../../../../styled/ThemeVariables.js';

// functions
import { handleDate } from "../../../../../functions/handleDates";

export const InfoContainer = ({ ticket, setLink }) => {
  return (
    <StyledTicketSection>
      <h2><span>Creator: </span>{ticket.author}</h2>
      <h2><span>Created: </span>{handleDate(ticket.date)}</h2>
      <h2><span>Updated: </span>{handleDate(ticket.lastUpdate)}</h2>
      <label>Link
        <input 
          type="text" 
          defaultValue={ticket.link} 
          onChange={(e) => { setLink(e.target.value)}}
        />
      </label>
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
  label {
    display: flex;
    flex-direction: column;
    color: white;
    margin: 10px 0 0 0;
    font-weight: 400;
    font-size: .8em;
    width: 100%;
    max-width: 500px;
    input {
      padding: 6px 0;
      cursor: pointer;
      width: 100%;
      font-size: 1em;
      background: ${palette.helperGrey};
      font-weight: 400;
    }
  }
`;