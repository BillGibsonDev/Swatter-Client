import { useEffect, useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../styled/ThemeVariables.js";

// sections
import ImageSection from "./sections/ImageSection.js";
import { CommentSection } from "./sections/CommentSection.js";

// loaders
import BugPageLoader from "../../loaders/BugPageLoader";

// router
import { Link, useParams } from "react-router-dom";

// images
import EditIcon from "../../assets/icons/editIconWhite.png";

// components
import { BreadCrumbs } from "../../components/Breadcrumbs.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DeleteAlert } from "../../components/DeleteAlert.js";
import { Alert } from "../../components/Alert.js";

export const BugPage = () => {
  const { projectId, bugId } = useParams();

  const DeleteAlertRef = useRef();
  const AlertRef = useRef();

  const [ bug, setBug ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ images, setImages ] = useState([]);

  useEffect(() => {
    const getBug = (projectId, bugId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
      .then((response) => {
        setBug(response.data.bugs[0]);
        setImages(response.data.bugs[0].images);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getBug(projectId, bugId);
  }, [projectId, bugId, isLoading]);

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
    <StyledBugPage>
      <Alert 
        
      />
      <DeleteAlert
        DeleteAlertRef={DeleteAlertRef}
      />
      <BreadCrumbs 
        projectId={projectId}
        projectTitle={"Project"} 
        title={bug.title}
      />
      {
        isLoading ? <BugPageLoader />
       : 
        <div className='bug-wrapper'>
          <div className='title-container'>
            <h1>{bug.title}</h1>
            <Link to={`/${projectId}/${bugId}/edit`}><img src={EditIcon} alt='edit bug link' />Edit</Link>
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
          <p id='description'><span>Description: </span> {bug.description}</p>
          <ButtonContainer />
          <ImageSection images={images} handleModal={handleModal} />
          <CommentSection bugId={bugId} projectId={projectId} setLoading={setLoading} />
        </div>
      }
    </StyledBugPage>
  );
}

const StyledBugPage = styled.div`
  height: 100%;
  width: 70%;
  margin: 20px auto;
  @media (max-width: 834px) {
    width: 90%;
  }
  @media (max-width: 428px) {
    width: 85%;
    padding: 10px;
    margin: 0 0 auto auto;
  }
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
        font-size: 30px;
        margin: 10px 0;
        @media (max-width: 450px) {
          font-size: 20px;
        }
      }
      a {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: white;
        font-size: 20px;
        padding: 4px 10px;
        border-radius: 8px;
        margin-left: 20px;
        @media (max-width: 450px) {
          font-size: 16px;
        }
        img {
          margin-right: 4px;
          height: 20px;
          width: 20px;
          @media (max-width: 450px) {
            height: 16px;
            width: 16px;
          }
        }
        &:hover {
          background: black;
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
      .info-container,
      .selector-container {
        width: 50%;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        @media (max-width: 450px) {
          width: 90%;
        }
        h2,
        h3 {
          color: white;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          margin: 4px 0;
          font-weight: 400;
          span {
            color: #cecece;
            font-weight: 400;
            font-size: 12px;
          }
        }
        h3 {
          flex-direction: row;
          span {
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
    #description {
      color: white;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      margin: 50px 0;
      border-top: 2px solid grey;
      border-bottom: 2px solid grey;
      padding: 50px 0;
      @media (max-width: 450px) {
        font-size: 14px;
      }
      span {
        color: ${palette.helperGrey};
      }
    }
  }
`;