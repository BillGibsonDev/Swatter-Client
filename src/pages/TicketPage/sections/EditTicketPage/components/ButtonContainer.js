// styled
import styled from "styled-components";

// functions
import { handleDeleteAlert } from "../../../../../functions/handleDeleteAlert.js";

export const ButtonContainer = ({ DeleteAlertRef, updateTicket, setRerender, rerender}) => {

  return (
    <StyledButtonContainer>
      <button onClick={() => { updateTicket(); setRerender(!rerender); }}>Save</button>
      <button id='delete'onClick={() => { handleDeleteAlert(DeleteAlertRef); }}>Delete</button>
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  button {
    width: 40%;
    max-width: 300px;
    height: 40px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    font-weight: 700;
    font-size: 1em;
    transition: 0.2s;
    &:hover {
      color: #ffffff;
      background: #000000;
      transform: scale(1.05);
    }
  }
`;