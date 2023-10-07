import { useState } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styled
import styled from "styled-components";
import * as palette from "../styled/ThemeVariables.js";
import { StyledButton } from "../styled/StyledButton.js";

// components
import Loader from "../loaders/Loader";
import BreadCrumbs from "../components/Breadcrumbs.js";
import { TitleContainer } from "../components/TitleContainer.js";

// redux
import { connect } from "react-redux";
import { showAlert } from "../redux/actions/alert.js";

// router
import { useNavigate } from "react-router-dom";

// functions
import { handleImages } from '../functions/handleImages.js';

const CreateProjectPage = ({ user, showAlert }) => {

  const navigate = useNavigate();

  const [ title, setTitle ] = useState("");
  const [ link, setLink ] = useState("");
  const [ image, setImage ] = useState("");
  const [ isLoading, setLoading ] = useState(false);
  const [ description, setDescription ] = useState("");
  const [ repository, setRepository ] = useState("");

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

  const createProject = async (event) => {
    event.preventDefault();
    const imageURL = await handleImages(image)
    validationSchema.validate({ title, link, repository, description })
    .then(() => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/create`,
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
        if(response.status === 200){
          showAlert('', 'success');
          setLoading(false);
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error);
        showAlert(error, 'error');
        setLoading(false);
      });
    })
    .catch((validationError) => {
			showAlert(validationError, 'error');
		});
  };

  if(isLoading){
    return <Loader />;
  }

  return (
    <StyledPage>
      <BreadCrumbs
        projectTitle={'Create Project'}
      />
      <TitleContainer
        title={'Create Project'}
        samePage={false}
      />
      <div className='form-wrapper'>
        <div className="inputs-container">
          <div className='form-container'>
            <label>Title
              <input type='text' id='title' onChange={(event) => { setTitle(event.target.value); }} />
            </label>
            <label>Image
              <input type='file' id='image' onChange={(event) => { setImage(event.target.files[0]); }} />
            </label>
          </div>
          <div className='form-container'>
            <label>Website
              <input type='text' id='link' onChange={(event) => { setLink(event.target.value); }} />
            </label>
            <label>Repository
              <input type='text' id='repository' onChange={(event) => { setRepository(event.target.value); }} />
            </label>
          </div>
        </div>
        <label id="description-label">Description
          <textarea id='description' onChange={(event) => { setDescription(event.target.value); }} />
        </label>
      </div>
      <StyledButton disabled={isLoading} onClick={(event) => { createProject(event); }}>Start</StyledButton>
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  width: 80%;
  max-width: 800px;
  margin: 10px auto;
  h1 {
    color: white;
    width: 100%;
    font-size: ${palette.titleSize};
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
        margin: auto;
        @media (max-width: 750px) {
          width: 100%;
        }
        label {
          margin: 10px 0 0 0;
          color: ${palette.labelColor};
          font-size: ${palette.labelSize};
          input {
            color: black;
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectPage);