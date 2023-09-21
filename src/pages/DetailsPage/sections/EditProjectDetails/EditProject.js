import { useState, useRef } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styled
import styled from "styled-components";
import * as palette from "../../../../styled/ThemeVariables.js";

// router
import { useNavigate } from "react-router-dom";

// functions
import { handleDeleteAlert } from "../../../../functions/handleDeleteAlert.js";
import { handleImages } from '../../../../functions/handleImages.js';
 
// components
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { TitleContainer } from "../../../../components/TitleContainer.js";

// loaders
import Loader from "../../../../loaders/Loader.js";

// redux
import { connect } from "react-redux";
import { showAlert } from "../../../../redux/actions/alert.js";

const EditProject = ({ user, showAlert, setProject, editing, setEditing, isLoading, setLoading, project, projectId }) => {
  
  const navigate = useNavigate();

  const DeleteAlertRef = useRef();

  const deleteProject = () => {
    setLoading(true);
    axios.delete(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/delete`,
    {
      headers: {
        Authorization: user.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
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
  const [ link, setLink ] = useState(project.link);
  const [ image, setImage ] = useState(project.image);
  const [ description, setDescription ] = useState(project.description);
  const [ repository, setRepository ] = useState(project.repository);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(30, 'Title cannot exceed 30 characters'),
    link: Yup.string()
      .url('Invalid url format'),
    repository: Yup.string()
      .url('Invalid url format'),
    description: Yup.string()
      .max(500, 'Descriptions can not be longer than 500 characters')
  });

  const updateProject = async (event) => {
    event.preventDefault();
    const imageURL = await handleImages(image);
    validationSchema.validate({ title, link, repository, description })
    .then(() => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/edit`,
        {
          title,
          link,
          image: imageURL,
          repository,
          description,
        },
        {
          headers: {
            Authorization: user.token
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setProject(response.data)
          setEditing(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
    })
    .catch((validationError) => {
			showAlert(validationError, 'error');
		});
  };

  if(isLoading){
    return <Loader />
  }

  return (
    <StyledSection>
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteProject}
        title={project.title}
      />
      <TitleContainer 
        title={project.title}
        type={'edit'}
        stateChanger={setEditing}
        state={editing}
      />
      <div className='form-wrapper'>
        <div className="inputs-container">
          <div className='form-container'>
            <label>Title
              <input 
                type='text' 
                id='title' 
                defaultValue={project.title}
                onChange={(event) => { setTitle(event.target.value); }} 
              />
            </label>
            <label>Image
              <input 
                type='file' 
                id='image' 
                onChange={(event) => { setImage(event.target.files[0]); }} 
              />
            </label>
          </div>
          <div className='form-container'>
            <label>Website
              <input 
                type='text' 
                id='link' 
                defaultValue={project.link}
                onChange={(event) => { setLink(event.target.value); }} 
              />
            </label>
            <label>Repository
              <input 
                type='text' 
                id='repository' 
                defaultValue={project.repository}
                onChange={(event) => { setRepository(event.target.value); }} 
              />
            </label>
          </div>
        </div>
        <label id="description-label">Description
          <textarea 
            id='description' 
            defaultValue={project.description} 
            onChange={(event) => { setDescription(event.target.value); }} 
          />
        </label>
      </div>
      <ButtonContainer
        editProject={updateProject}
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
      />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 10px auto;
  .title-container {
    display: flex;
    width: 100%;
    align-items: center;
    h1 {
      color: white;
      font-size: ${palette.titleSize};
      margin-right: auto;
    }
  }
  .form-wrapper {
    .inputs-container {
      width: 100%;
      margin: 10px auto;
      display: flex;
      justify-content: space-between;
      @media (max-width: 750px) {
        flex-direction: column;
      }
      .form-container {
        width: 45%;
        margin: auto 0;
        @media (max-width: 750px) {
          width: 100%;
        }
        label {
          display: flex;
          flex-direction: column;
          margin: 10px 0 0 0;
          color: ${palette.labelColor};
          font-size: ${palette.labelSize};
          input {
            width: 100%;
            max-width: 350px;
            font-size: 1em;
            padding: 2px;
            background: ${palette.helperGrey};
          }
        }
      }
    }
    #description-label {
      width: 100%;
      font-size: ${palette.labelSize};
      color: ${palette.labelColor};
      textarea {
        width: 100%;
        height: 100px;
        padding: 2px;
        background: ${palette.helperGrey};
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);