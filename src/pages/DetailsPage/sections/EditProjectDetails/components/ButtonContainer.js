// styled
import styled from "styled-components";

export const ButtonContainer = ({  handleDeleteAlert, editProject, DeleteAlertRef }) => {
  return (
    <StyledButtonContainer>
      <button onClick={() => { editProject(); }}>Update</button>
      <button id='delete' onClick={() => { handleDeleteAlert(DeleteAlertRef); }}>Delete</button>
    </StyledButtonContainer>
  )
}

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  width: 100%;
  @media (max-width: 750px) {
    margin-top: 10%;
  }
  button {
    width: 40%;
    max-width: 300px;
    height: 40px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    font-weight: 700;
    font-size: 1em;
    @media (max-width: 1050px) {
      margin: 10px 0;
    }
    @media (max-width: 450px) {
      margin-bottom: 0;
    }
    &:hover {
      color: #ffffff;
      background: #000000;
      transform: scale(1.05);
      transition: 0.2s;
    }
  }
`;