// styled
import styled from "styled-components";

// functions
import { handleDeleteAlert } from "../../../functions/handleDeleteAlert.js";
import { handleAdminAuth } from "../../../functions/handleAdminAuth.js";

// redux
import { connect } from "react-redux";

const ButtonContainer = ({ user, DeleteAlertRef, updateBug, setRerender, rerender}) => {

  return (
    <StyledButtonContainer>
      {
        handleAdminAuth(user)
        ? <>
            <button onClick={() => { updateBug(); setRerender(!rerender); }}>Save</button>
            <button id='delete'onClick={() => { handleDeleteAlert(DeleteAlertRef); }}>Delete</button>
          </>
        : <>
          <button>Save</button>
          <button id='delete'>Delete</button>
        </>
      }
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  button {
    width: 200px;
    height: 40px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    font-weight: 700;
    font-size: 18px;
    transition: 0.2s;
    @media (max-width: 1050px) {
      margin: 10px 0;
      width: 150px;
    }
    @media (max-width: 450px) {
      font-size: 16px;
      width: 100px;
      margin-bottom: 0;
    }
    &:hover {
      color: #ffffff;
      background: #000000;
      transform: scale(1.05);
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ButtonContainer);