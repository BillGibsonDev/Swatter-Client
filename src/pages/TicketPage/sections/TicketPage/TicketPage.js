// styled
import styled from "styled-components";

// components
import { ImageSection } from "./components/ImageSection.js";
import { CommentSection } from "./components/CommentSection.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DescriptionBox } from "./components/DescriptionBox.js";

// redux
import { connect } from "react-redux";
import { DetailsSection } from "./components/DetailsContainer.js";

const TicketPage = ({ ticket, setEditing, ticketId, projectId, user, setLoading }) => {

  return (
    <StyledSection>
      <div className="title-wrapper">
        <div className="title-container">
          <h1>{ticket.title}</h1>
          <DetailsSection ticket={ticket} setEditing={setEditing} />
        </div>
        <InfoContainer ticket={ticket} />
      </div>
      <DescriptionBox description={ticket.description} />
      <ButtonContainer images={ticket.images} />
      <ImageSection images={ticket.images} />
      <CommentSection user={user} ticketId={ticketId} projectId={projectId} setLoading={setLoading} />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  h1 {
    color: #fff;
    font-size: 1.5em;
    @media (max-width: 428px) {
      font-size: 1.2em;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(TicketPage);