import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../styled/ThemeVariables.js";

// images
import Edit from "../assets/icons/editIconWhite.png";

// router
import { Link, useParams } from "react-router-dom";

// loaders
import "../loaders/Loader.js";
import Loader from "../loaders/Loader.js";

export default function DetailsPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getProject = () => {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    getProject(projectId);
  }, [projectId]);

  return (
    <StyledDetails>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='links-wrapper'>
            <div className='breadcrumbs'>
              <Link to={`/`}>Home</Link>
              <span>/</span>
              <Link to={`/projects/${project._id}`}>
                {project.projectTitle}
              </Link>
              <span>/</span>
              <p>Details</p>
            </div>
          </div>
          <div className='title-container'>
            <h1>{project.projectTitle}</h1>
            <Link id='edit-btn' to={`/EditProject/${project._id}`}>
              <img id='edit-btn-icon' src={Edit} alt='' />
              <span className='tooltiptext'>Edit Project</span>
            </Link>
          </div>
          <div className='info-container'>
            <div className='container'>
              <h6>
                <span>Type:</span> {project.projectType}
              </h6>
              <h6>
                <span>Description:</span> {project.description}
              </h6>
            </div>
            <div className='container'>
              <h6>
                <span>Lead:</span> {project.projectLead}
              </h6>
              <h6>
                <span>Started:</span> {project.startDate}
              </h6>
            </div>
          </div>
        </>
      )}
    </StyledDetails>
  );
}

const StyledDetails = styled.div`
  height: 100%;
  width: 70%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 834px) {
    width: 80%;
  }
  @media (max-width: 428px) {
    margin: 20px auto auto 60px;
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
  .title-container {
    display: flex;
    width: 300px;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: white;
      font-size: 30px;
    }
    #edit-btn {
      width: 30px;
      height: 30px;
      z-index: 3;
      @media (max-width: 450px) {
        margin-bottom: 0;
        width: 24px;
        height: 24px;
      }
      .tooltiptext {
        font-size: 16px;
        visibility: hidden;
        width: 150px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1000;
        margin-left: 6px;
        @media (max-width: 450px) {
          left: 30%;
        }
      }
      #edit-btn-icon {
        width: 100%;
        height: 100%;
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
          transition: 0.2s;
        }
      }
    }
    #edit-btn:hover .tooltiptext,
    #edit-btn:active .tooltiptext,
    #edit-btn:focus .tooltiptext {
      visibility: visible;
      transition-delay: 1s;
    }
  }
  .info-container {
    .container {
      h6 {
        margin: 10px 0;
        font-size: 18px;
        color: white;
        @media (max-width: 428px) {
          font-size: 14px;
          margin: 20px 0;
        }
        span {
          color: ${pallette.helperGrey};
        }
      }
    }
  }
`;
