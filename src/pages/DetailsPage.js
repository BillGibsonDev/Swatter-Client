import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../styled/ThemeVariables.js";

// images
import Edit from "../assets/icons/editIconWhite.png";

// router
import { Link, useParams } from "react-router-dom";

// loaders
import Loader from "../loaders/Loader.js";

import { BreadCrumbs } from "../components/Breadcrumbs.js";

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
      .catch((err) => {
        console.log(err);
      });
    };
    getProject(projectId);
  }, [projectId]);

  return (
    <StyledDetails>
      {
        isLoading ? <Loader />
       : 
        <>
          <BreadCrumbs 
            projectId={projectId}
            projectTitle={project.projectTitle}
            title={'Details'}
          />
          <div className='title-container'>
            <h1>{project.projectTitle}</h1>
            <Link id='edit-btn' to={`/EditProject/${project._id}`}>
              <img id='edit-btn-icon' src={Edit} alt='edit' />
            </Link>
          </div>
          <div className='container'>
            <h6><span>Type:</span> {project.projectType}</h6>
            <h6><span>Description:</span> {project.description}</h6>
          </div>
          <div className='container'>
            <h6><span>Lead:</span> {project.projectLead}</h6>
            <h6><span>Started:</span> {project.startDate}</h6>
            <a href={project.repository} target='_blank' rel='noreferrer'><span>Repository:</span> {project.repository}</a>
            <a href={project.projectLink} target='_blank' rel='noreferrer'><span>Website:</span> {project.projectLink}</a>
          </div>
        </>
      }
    </StyledDetails>
  );
}

const StyledDetails = styled.div`
  height: 100%;
  width: 70%;
  margin: 20px auto;
  @media (max-width: 834px) {
    width: 80%;
  }
  @media (max-width: 428px) {
    margin: 20px auto auto 60px;
  }
  .title-container {
    display: flex;
    width: 300px;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: white;
      font-size: ${palette.titleSize};
    }
    #edit-btn {
      width: 25px;
      height: 25px;
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
  }
  .container {
    display: flex; 
    flex-direction: column;
    h6, a {
      margin: 10px 0;
      font-size: 1em;
      color: white;
      @media (max-width: 428px) {
        margin: 20px 0;
      }
      span {
        color: ${palette.helperGrey};
      }
    }
    a:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;
