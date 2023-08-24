import { useRef } from "react";
// styled
import styled from "styled-components";

// images
import EditIcon from "../../../../assets/icons/editIconWhite.png";

// components
import ImageSection from "./components/ImageSection.js";
import { CommentSection } from "./components/CommentSection.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { DescriptionBox } from "./components/DescriptionBox.js";

// redux
import { connect } from "react-redux";

const BugPage = ({ images, bug, setEditing, bugId, projectId, user, setLoading }) => {

  const DeleteAlertRef = useRef();

  const handleModal = (index) => {
    let modal = document.getElementById(index);
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  const handleSprint = (bug) => {
    if(!bug.sprint){
      return 'None'
    } else {
      return bug.sprint
    }
  }

  return (
    <StyledSection>
      <DeleteAlert
        DeleteAlertRef={DeleteAlertRef}
      />
      <div className='bug-wrapper'>
        <div className='title-container'>
          <h1>{bug.title}</h1>
          <button id="toggle-edit-button" onClick={() => { setEditing(true)}}><img src={EditIcon} alt='edit bug link' /></button>
        </div>
        <div className='info-wrapper'>
          <div className='info-container'>
            <h3><span>Tag: </span> {bug.tag}</h3>
            <h3 className={bug.priority}><span>Priority: </span> {bug.priority}</h3>
            <h3><span>Status: </span>{bug.status}</h3>
            <h3><span>Sprint: </span>{handleSprint(bug)}</h3>
          </div>
          <InfoContainer bug={bug} />
        </div>
        <DescriptionBox description={bug.description} />
        <ButtonContainer />
        <ImageSection images={images} handleModal={handleModal} />
        <CommentSection user={user} bugId={bugId} projectId={projectId} setLoading={setLoading}/>
      </div>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  margin: 20px auto;
  .bug-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    .title-container {
      display: flex;
      align-items: center;
      @media (max-width: 450px) {
        justify-content: space-between;
      }
      h1 {
        color: white;
        font-size: 2em;
        margin: 10px 0;
        @media (max-width: 450px) {
          font-size: 1.5em;
        }
      }
    }
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
        .Standard {
          color: lightgreen;
        }
        .Medium {
          color: yellow;
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

export default connect(mapStateToProps)(BugPage);