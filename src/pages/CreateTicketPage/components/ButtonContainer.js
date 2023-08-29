// styled
import styled from "styled-components";
import { StyledButton } from "../../../styled/StyledButton";

// redux
import { connect } from "react-redux";

const ButtonContainer = ({ createTicket }) => {

  return (
    <StyledButtonContainer>
      <StyledButton onClick={() => { createTicket() }}>Create</StyledButton>
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
  margin-top: 30px;
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ButtonContainer);