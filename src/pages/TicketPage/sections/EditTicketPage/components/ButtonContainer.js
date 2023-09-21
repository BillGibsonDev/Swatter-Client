// styled
import styled from "styled-components";

// functions
import { handleDeleteAlert } from "../../../../../functions/handleDeleteAlert.js";
import { StyledButton } from "../../../../../styled/StyledButton.js";

export const ButtonContainer = ({ DeleteAlertRef, updateTicket }) => {

  return (
    <StyledButtonContainer>
      <StyledButton onClick={(event) => { updateTicket(event); }}>Save</StyledButton>
      <StyledButton id='delete'onClick={() => { handleDeleteAlert(DeleteAlertRef); }}>Delete</StyledButton>
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  button {
    margin: 0;
    &:hover {
      color: #ffffff;
      background: #000000;
      transform: scale(1.05);
    }
  }
`;