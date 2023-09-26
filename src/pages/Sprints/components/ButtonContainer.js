// styled
import styled from "styled-components";
import { StyledButton } from '../../../styled/StyledButton.js';

export const ButtonContainer = ({ handleDeleteAlert, handleUpdateSprint, DeleteAlertRef }) => {
  return (
    <StyledButtonContainer>
      <StyledButton onClick={(event) => { handleUpdateSprint(event); }}>Update</StyledButton>
      <StyledButton id='delete' onClick={() => { handleDeleteAlert(DeleteAlertRef); }}>Delete</StyledButton>
    </StyledButtonContainer>
  )
}

const StyledButtonContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  @media (max-width: 420px) {
    flex-direction: column;
  }
  button {
    margin: 0;
    max-width: 200px;
    @media (max-width: 420px) {
      margin-bottom: 10px;
      max-width: 300px;
    }
  }
`;