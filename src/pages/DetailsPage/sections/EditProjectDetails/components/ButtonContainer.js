// styled
import styled from "styled-components";
import { StyledButton } from '../../../../../styled/StyledButton.js';

export const ButtonContainer = ({  handleDeleteAlert, editProject, DeleteAlertRef }) => {
  return (
    <StyledButtonContainer>
      <StyledButton onClick={(event) => { editProject(event); }}>Update</StyledButton>
      <StyledButton id='delete' onClick={() => { handleDeleteAlert(DeleteAlertRef); }}>Delete</StyledButton>
    </StyledButtonContainer>
  )
}

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;