import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../styled/ThemeVariables.js";

// router
import { Link, useParams, useNavigate } from "react-router-dom";

// functions
import { unauthorized } from "../functions/unauthorized.js";
import { handleAlert } from "../functions/handleAlert.js";
import { handleDeleteAlert } from "../functions/handleDeleteAlert.js";

// components
import Loader from "../loaders/Loader";
import { DeleteAlert } from "../components/DeleteAlert.js";
import { Alert } from '../components/Alert.js';

// redux
import { connect } from "react-redux";

const EditProjectPage = ({ user }) => {

  const { projectId } = useParams();
  
  const navigate = useNavigate();

  const AlertRef = useRef();
  const DeleteAlertRef = useRef();

  const [ message, setMessage ] = useState('');
  const [project, setProject] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getProject = () => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`
        )
        .then(function (response) {
          setProject(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getProject(projectId);
  }, [projectId, user]);

  const deleteProject = () => {
    setLoading(true);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_PROJECT_URL}/${projectId}`
      )
    .then(function (response) {
      if (response.data !== "Project Deleted") {
        setMessage(`Server Error - Project not deleted!`);
        setLoading(false);
        handleAlert(AlertRef);
      } else {
        setMessage(`Project deleted!`);
        setLoading(false);
        handleAlert(AlertRef);
        navigate("/");
      }
    });
  };

  const [projectTitle, setProjectTitle] = useState(project.projectTitle);
  const [startDate, setStartDate] = useState(project.startDate);
  const [projectLink, setProjectLink] = useState(project.projectLink);
  const [projectImage, setProjectImage] = useState(project.projectImage);
  const [projectKey, setProjectKey] = useState(project.projectKey);
  const [description, setDescription] = useState(project.description);
  const [repository, setRepository] = useState(project.repository);
  const [projectLead, setProjectLead] = useState(project.projectLead);
  const [projectType, setProjectType] = useState(project.projectType);

  const editProject = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_UPDATE_PROJECT_URL}/${projectId}`,
        {
          projectTitle: projectTitle,
          startDate: startDate,
          projectLink: projectLink,
          projectImage: projectImage,
          repository: repository,
          description: description,
          projectKey: projectKey,
          projectLead: projectLead,
          projectType: projectType,
        }
      )
      .then(function (response) {
        if (response.data !== "Project Updated") {
          setMessage('Server Error - Project not updated');
          setLoading(false);
          handleAlert(AlertRef);
        } else {
          setMessage(`${project.projectTitle} updated!`);
          setLoading(false);
          handleAlert(AlertRef);
        }
      });
  };

  return (
    <StyledProjectPage>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteProject}
        title={project.projectTitle}
      />
      <div className='breadcrumbs'>
        <Link to={`/`}>Home</Link>
        <span>/</span>
        <Link to={`/`}>Edit Project</Link>
      </div>
      <h1>Edit Project</h1>
      {
        user === null 
        ? <h1>You are signed out</h1>
        : isLoading ? <Loader />
        :
        <div className='form-wrapper'>
          <div className='top-form-container'>
            <label>
              Title
              <input
                type='text'
                id='title'
                defaultValue={project.projectTitle}
                onChange={(event) => {
                  setProjectTitle(event.target.value);
                }}
              />
            </label>
            <label>
              Key
              <input
                type='text'
                id='key'
                defaultValue={project.projectKey}
                onChange={(event) => {
                  setProjectKey(event.target.value);
                }}
              />
            </label>
            <label>
              URL
              <input
                type='text'
                id='projectLink'
                defaultValue={project.projectLink}
                onChange={(event) => {
                  setProjectLink(event.target.value);
                }}
              />
            </label>
            <label>
              Repository
              <input
                type='text'
                id='repository'
                defaultValue={project.repository}
                onChange={(event) => {
                  setRepository(event.target.value);
                }}
              />
            </label>
            <label>
              Lead
              <input
                type='text'
                id='projectLead'
                defaultValue={project.projectLead}
                onChange={(event) => {
                  setProjectLead(event.target.value);
                }}
              />
            </label>
          </div>
          <div className='bottom-form-container'>
            <label>
              Date
              <input
                type='text'
                id='date'
                defaultValue={project.startDate}
                onChange={(event) => {
                  setStartDate(event.target.value);
                }}
              />
            </label>
            <label>
              Project Type
              <input
                type='text'
                id='projectType'
                defaultValue={project.projectType}
                onChange={(event) => {
                  setProjectType(event.target.value);
                }}
              />
            </label>
            <label>
              Description
              <input
                type='text'
                id='description'
                defaultValue={project.description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </label>
            <label>
              Image
              <input
                type='text'
                id='image'
                defaultValue={project.projectImage}
                onChange={(event) => {
                  setProjectImage(event.target.value);
                }}
              />
            </label>
          </div>
        </div>
      }
      <div className='button-container'>
        {
          user.role === process.env.REACT_APP_GUEST_SECRET 
          ? <button onClick={() => { unauthorized(); }}> Update</button>
          : <button onClick={() => { editProject(); }}>Update</button>
        }
        {
          user.role === process.env.REACT_APP_ADMIN_SECRET
          ? <button id='delete' onClick={() => { handleDeleteAlert(DeleteAlertRef); }}>Delete</button>
          : <button onClick={() => { unauthorized(); }}>Delete</button>
        }
      </div>
    </StyledProjectPage>
  );
}

const StyledProjectPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  min-height: 50vh;
  margin: 20px auto;
  @media (max-width: 1160px) {
    width: 80%;
    left: 60px;
  }
  @media (max-width: 834px) {
    left: 0;
  }
  @media (max-width: 750px) {
    height: 40vh;
    margin: 20px auto;
  }
  @media (max-width: 428px) {
    margin-left: 65px;
    width: 80vw;
  }
  .breadcrumbs {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    @media (max-width: 428px) {
      display: none;
    }
    a {
      font-size: 20px;
      color: ${pallette.helperGrey};
      @media (max-width: 450px) {
        font-size: 12px;
      }
      &:hover {
        color: white;
      }
    }
    span {
      margin: 0 10px;
      color: white;
    }
  }
  h1 {
    color: white;
    font-size: 2em;
  }
  .form-wrapper {
    width: 100%;
    margin: 16px auto;
    display: flex;
    justify-content: space-between;
    @media (max-width: 750px) {
      flex-direction: column;
    }
    .top-form-container,
    .bottom-form-container {
      margin: 0;
      width: 45%;
      @media (max-width: 600px) {
        width: 100%;
      }
      label {
        display: flex;
        color: white;
        flex-direction: column;
        margin: 10px 0;
        input,
        select {
          width: 400px;
          padding: 2px;
          background: ${pallette.helperGrey};
          @media (max-width: 834px) {
            width: 100%;
          }
          @media (max-width: 750px) {
            width: 100%;
          }
          @media (max-width: 428px) {
            font-size: 16px;
            height: 30px;
          }
        }
      }
    }
  }
  .button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    width: 100%;
    @media (max-width: 750px) {
      margin-top: 10%;
      width: 90%;
    }
    button {
      width: 200px;
      height: 40px;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 18px;
      @media (max-width: 1050px) {
        margin: 10px 0;
        width: 150px;
      }
      @media (max-width: 450px) {
        font-size: 16px;
        width: 100px;
        margin-bottom: 0;
      }
      &:hover {
        color: #ffffff;
        background: #000000;
        transform: scale(1.05);
        transition: 0.2s;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditProjectPage);