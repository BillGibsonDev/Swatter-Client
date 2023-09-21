// styled
import styled from "styled-components";
import { StyledButton } from "../../../styled/StyledButton";

// redux
import { connect } from "react-redux";

const ButtonContainer = ({ createTicket }) => {

  return (
    <StyledButtonContainer>
      <StyledButton id="create-btn" onClick={(event) => { createTicket(event) }}>Create</StyledButton>
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
  max-width: 500px;
  width: 100%;
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ButtonContainer);