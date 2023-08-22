import { useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../../../styled/ThemeVariables.js";

// router
import { useNavigate } from "react-router-dom";

// images
import EditIcon from "../../../../assets/icons/editIconWhite.png";

// functions
import { handleDeleteAlert } from "../../../../functions/handleDeleteAlert.js";

// components
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import ButtonContainer from "./components/ButtonContainer.js";

// loaders
import Loader from "../../../../loaders/Loader.js";

// redux
import { connect } from "react-redux";

const EditProject = ({ user, setEditing, isLoading, setLoading, project, projectId }) => {
  
  const navigate = useNavigate();

  const DeleteAlertRef = useRef();

  const deleteProject = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/delete`, {},
    {
      headers: {
        Authorization: user.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  };

  const [ title, setTitle ] = useState(project.title);
  const [ startDate, setStartDate ] = useState(project.startDate);
  const [ link, setLink ] = useState(project.link);
  const [ image, setImage ] = useState(project.image);
  const [ key, setKey ] = useState(project.key);
  const [ description, setDescription ] = useState(project.description);
  const [ repository, setRepository ] = useState(project.repository);
  const [ lead, setLead ] = useState(project.lead);
  const [ type, setType ] = useState(project.type);

  const editProject = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/edit`,
      {
        title: title,
        startDate: startDate,
        link: link,
        image: image,
        repository: repository,
        description: description,
        key: key,
        lead: lead,
        type: type,
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        setEditing(false);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  };

  return (
    <StyledDetails>
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteProject}
        title={project.title}
      />
      <div className='title-container'>
        <h1>Edit Project</h1>
        <button id="toggle-edit-button" onClick={() => { setEditing(false)}}><img src={EditIcon} alt='edit' /></button>
      </div>
      {
        isLoading ? <Loader />
        :
        <div className='form-wrapper'>
          <div className='form-container'>
            <label>
              Title
              <input
                type='text'
                id='title'
                defaultValue={project.title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </label>
            <label>
              Key
              <input
                type='text'
                id='key'
                readOnly
                defaultValue={project.key}
                onChange={(event) => {
                  setKey(event.target.value);
                }}
              />
            </label>
            <label>
              URL
              <input
                type='text'
                id='projectLink'
                defaultValue={project.link}
                onChange={(event) => {
                  setLink(event.target.value);
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
                defaultValue={project.lead}
                onChange={(event) => {
                  setLead(event.target.value);
                }}
              />
            </label>
          </div>
          <div className='form-container'>
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
                defaultValue={project.type}
                onChange={(event) => {
                  setType(event.target.value);
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
                defaultValue={project.image}
                onChange={(event) => {
                  setImage(event.target.value);
                }}
              />
            </label>
          </div>
        </div>
      }
      <ButtonContainer
        editProject={editProject}
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
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
    .form-container {
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditProject);