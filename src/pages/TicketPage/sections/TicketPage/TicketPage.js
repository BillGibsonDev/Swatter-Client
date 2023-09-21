import { useRef } from "react";
// styled
import styled from "styled-components";

// components
import { ImageSection } from "./components/ImageSection.js";
import { CommentSection } from "./components/CommentSection.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { DescriptionBox } from "./components/DescriptionBox.js";

// redux
import { connect } from "react-redux";
import { TitleContainer } from "../../../../components/TitleContainer";

const TicketPage = ({ ticket, editing, setEditing, ticketId, projectId, user, setLoading }) => {

  const DeleteAlertRef = useRef();

  const handleModal = (index) => {
    let modal = document.getElementById(index);
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  return (
    <StyledSection>
      <DeleteAlert
        DeleteAlertRef={DeleteAlertRef}
      />
      <div className='ticket-wrapper'>
        <TitleContainer title={ticket.title} stateChanger={setEditing} state={editing} type={'edit'} />
        <div className='info-wrapper'>
          <div className='info-container'>
            <h3><span>Tag: </span> {ticket.tag}</h3>
            <h3 className={ticket.priority}><span>Priority: </span> { ticket.priority ? ticket.priority : 'None'}</h3>
            <h3><span>Status: </span>{ticket.status}</h3>
            <h3><span>Sprint: </span>{ ticket.sprint ? ticket.sprint : 'None'}</h3>
          </div>
          <InfoContainer ticket={ticket} />
        </div>
        <DescriptionBox description={ticket.description} />
        <ButtonContainer />
        <ImageSection images={ticket.images} handleModal={handleModal}/>
        <CommentSection user={user} ticketId={ticketId} projectId={projectId} setLoading={setLoading}/>
      </div>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  .ticket-wrapper {
    width: 100%;
    margin: auto;
    .info-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      @media (max-width: 450px) {
        flex-direction: column;
      }
      .info-container {
        width: 50%;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        @media (max-width: 450px) {
          width: 90%;
        }
        h3 {
          color: white;
          font-size: 1em;
          display: flex;
          margin: 4px 0;
          font-weight: 400;
          span {
            color: #cecece;
            font-weight: 400;
            font-size: 1em;
            margin-right: 6px;
          }
        }
        .High {
          color: red;
        }
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(TicketPage);