// styled
import styled from "styled-components";

// functions
import { handleAdminAuth } from "../../../functions/handleAdminAuth.js";

// redux
import { connect } from "react-redux";

const ButtonContainer = ({ user, createBug }) => {

  return (
    <StyledButtonContainer>
      {
        handleAdminAuth(user)
        ? <button onClick={() => { createBug() }}>Save</button> 
        : <button>Save</button>
      }
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
  margin-top: 30px;
  button {
    width: 60%;
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ButtonContainer);