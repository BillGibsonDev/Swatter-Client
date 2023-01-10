import { useEffect, useState } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../../styled/ThemeVariables.js";

// sections
import ImageSection from "./sections/ImageSection.js";
import CommentSection from "./sections/CommentSection.js";

// loaders
import BugPageLoader from "../../loaders/BugPageLoader";

// router
import { Link, useParams } from "react-router-dom";

// images
import EditIcon from "../../assets/icons/editIconWhite.png";

export default function BugPage({ role, user }) {
  const { projectId, bugId } = useParams();

  const [bug, setBug] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getBug = (projectId, bugId) => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`
        )
        .then(function (response) {
          setBug(response.data[0].bugs[0]);
          setImages(response.data[0].bugs[0].images);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
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

  const handleTabs = (e, section) => {
    let i;
    let tabs = document.getElementsByClassName("bug-page-tabs");
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
    }
    let tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(section).style.display = "block";
    e.currentTarget.className += " active";
  };

  return (
    <StyledBugPage>
      <div className='breadcrumbs'>
        <Link to={`/`}>Home</Link>
        <span>/</span>
        <Link to={`/projects/${projectId}`}>Project</Link>
        <span>/</span>
        {bug === undefined ? <></> : <p>{bug.title}</p>}
      </div>
      {isLoading ? (
        <BugPageLoader />
      ) : (
        <div className='bug-wrapper'>
          <div className='title-container'>
            <h1>{bug.title}</h1>
            <Link to={`/${projectId}/${bugId}/edit`}>
              <img src={EditIcon} alt='edit bug link' />
              Edit
            </Link>
          </div>
          <div className='info-wrapper'>
            <div className='info-container'>
              <h3>
                <span>Tag: </span> {bug.tag}
              </h3>
              <h3 className={bug.priority}>
                <span>Priority: </span> {bug.priority}
              </h3>
              <h3>
                <span>Status: </span> {bug.status}
              </h3>
              <h3>
                <span>Sprint: </span>
                {bug.sprint === undefined || bug.sprint === "" ? (
                  <>None</>
                ) : (
                  <>{bug.sprint}</>
                )}
              </h3>
            </div>
            <div className='info-container'>
              <h2>
                <span>Creator: </span>
                {bug.author}
              </h2>
              <h2>
                <span>Created: </span>
                {bug.date}
              </h2>
              <h2>
                <span>Updated: </span>
                {bug.lastUpdate}
              </h2>
            </div>
          </div>
          <p id='description'>
            <span>Description: </span> {bug.description}
          </p>
          <div className='button-container'>
            <button
              className='tablinks active'
              onClick={(e) => {
                handleTabs(e, "comments");
              }}
            >
              Comments
            </button>
            <button
              className='tablinks'
              onClick={(e) => {
                handleTabs(e, "images");
              }}
            >
              Images
            </button>
          </div>
          <ImageSection images={images} handleModal={handleModal} />
          <CommentSection
            bugId={bugId}
            projectId={projectId}
            role={role}
            user={user}
            setLoading={setLoading}
          />
        </div>
      )}
    </StyledBugPage>
  );
}

const StyledBugPage = styled.div`
  height: 100%;
  width: 70%;
  margin: 30px auto;
  @media (max-width: 834px) {
    width: 90%;
  }
  @media (max-width: 428px) {
    width: 85%;
    padding: 10px;
    margin: 0 0 auto auto;
  }
  .breadcrumbs {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    @media (max-width: 428px) {
      display: none;
    }
    a {
      border: none;
      background: none;
      font-size: 16px;
      color: ${pallette.helperGrey};
      cursor: pointer;
      @media (max-width: 450px) {
        font-size: 12px;
      }
      &:hover {
        color: white;
      }
    }
    p {
      font-size: 16px;
      color: ${pallette.helperGrey};
      @media (max-width: 450px) {
        font-size: 12px;
      }
    }
    span {
      margin: 0 10px;
      color: white;
    }
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
        color: ${pallette.helperGrey};
      }
    }
  }
  .button-container {
    border-bottom: 2px solid white;
    width: 80%;
    button {
      border: 1px solid ${pallette.helperGrey};
      font-size: 16px;
      border-radius: 0;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      cursor: pointer;
      padding: 8px 12px;
    }
    .active {
      background: black;
      color: white;
    }
  }
`;
