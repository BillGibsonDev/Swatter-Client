import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../../../styled/ThemeVariables.js";

// router
import { useNavigate } from "react-router-dom";

// images
import EditIcon from "../../../../assets/icons/editIconWhite.png";

// functions
import { handleAlert } from "../../../../functions/handleAlert.js";
import { handleDeleteAlert } from "../../../../functions/handleDeleteAlert.js";

// components
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { Alert } from '../../../../components/Alert.js';
import ButtonContainer from "./components/ButtonContainer.js";

// loaders
import Loader from "../../../../loaders/Loader.js";

export const EditProject = ({ setEditing, isLoading, setLoading, project, projectId }) => {
  
  const navigate = useNavigate();

  const AlertRef = useRef();
  const DeleteAlertRef = useRef();

  const [ message, setMessage ] = useState('');

  const deleteProject = () => {
    setLoading(true);
    axios.delete(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_PROJECT_URL}/${projectId}`)
    .then((response) => {
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
    })
    .catch((err) => {
      console.log(err);
      setMessage(`Server Error - Project not deleted!`);
      setLoading(false);
      handleAlert(AlertRef);
    })
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
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_UPDATE_PROJECT_URL}/${projectId}`,
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
    .then((response) => {
      if (response.data !== "Project Updated") {
        setMessage('Server Error - Project not updated');
        setLoading(false);
        handleAlert(AlertRef);
      } else {
        setMessage(`${project.projectTitle} updated!`);
        setLoading(false);
        handleAlert(AlertRef);
      }
    })
    .catch((err) => {
      console.log(err);
      setMessage('Server Error - Project not updated');
      setLoading(false);
      handleAlert(AlertRef);
    })
  };

  return (
    <StyledDetails>
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
      <div className='title-container'>
        <h1>Edit Project</h1>
        <button id="toggle-edit-button" onClick={() => { setEditing(false)}}><img src={EditIcon} alt='edit' /></button>
      </div>
      {
        isLoading ? <Loader />
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
      <ButtonContainer
        editProject={editProject}
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlert={DeleteAlertRef}
      />
    </StyledDetails>
  );
}

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  min-height: 50vh;
  .title-container {
    display: flex;
    max-width: 400px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: white;
      font-size: ${palette.titleSize};
    }
  }
  .form-wrapper {
    width: 100%;
    margin: 16px auto;
    display: flex;
    justify-content: space-between;
    @media (max-width: 838px) {
      flex-direction: column;
    }
    .top-form-container,
    .bottom-form-container {
      margin: 0;
      width: 45%;
      @media (max-width: 838px) {
        width: 100%;
      }
      label {
        display: flex;
        color: white;
        flex-direction: column;
        margin: 10px 0;
        width: 100%;
        max-width: 400px;
        input, select {
          width: 100%;
          padding: 2px;
          font-size: 1em;
          background: ${palette.helperGrey};
          height: 30px;
        }
      }
    }
  }
`;