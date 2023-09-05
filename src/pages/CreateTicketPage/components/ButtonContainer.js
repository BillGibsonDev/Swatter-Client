// styled
import styled from "styled-components";
import { StyledButton } from "../../../styled/StyledButton";

// redux
import { connect } from "react-redux";

const ButtonContainer = ({ createTicket }) => {

  return (
    <StyledButtonContainer>
      <StyledButton id="create-btn" onClick={() => { createTicket() }}>Create</StyledButton>
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
  margin: 30px auto;
  #create-btn {
    margin: 0 ;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ButtonContainer);