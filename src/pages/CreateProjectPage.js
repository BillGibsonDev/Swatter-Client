import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../styled/ThemeVariables.js";

// functions
import { handleAlert } from "../functions/handleAlert.js";

// components
import Loader from "../loaders/Loader";

// redux
import { connect } from "react-redux";
import { Alert } from "../components/Alert.js";
import { handleAdminAuth } from "../functions/handleAdminAuth.js";
import { BreadCrumbs } from "../components/Breadcrumbs.js";

const CreateProjectPage = ({ user }) => {

  const AlertRef = useRef();
  
  const [ message, setMessage ] = useState('');

  const [projectTitle, setProjectTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [projectKey, setProjectKey] = useState("");
  const [description, setDescription] = useState("");
  const [repository, setRepository] = useState("");
  const [projectLead, setProjectLead] = useState("");
  const [projectType, setProjectType] = useState("");

  useEffect(() => {
    const handleDate = () => {
      const current = new Date();
      const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
      setStartDate(date);
    };
    handleDate();
  }, [user]);

  const addProject = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_ADD_PROJECT_URL}`,
      {
        projectTitle: projectTitle,
        startDate: startDate,
        author: user.username,
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
      if(response !== 'Project Created!'){
        setLoading(false);
        setMessage("Server Error - Project not created");
        handleAlert(AlertRef);
      } else {
        setLoading(false);
        setMessage(`${projectTitle} Project Started!`);
        handleAlert(AlertRef);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      setMessage("Server Error - Project not created");
      handleAlert(AlertRef);
    });
  };

  return (
    <StyledProjectPage>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <BreadCrumbs
        projectTitle={'Create Project'}
      />
      <h1>Start a Project</h1>
      {
        user === null ? <h1>You are signed out</h1>
        : isLoading ? <Loader />
        : 
        <div className='form-wrapper'>
          <div className='top-form-container'>
            <label>
              Title
              <input type='text' id='title' onChange={(event) => { setProjectTitle(event.target.value); }} />
            </label>
            <label>
              Key
              <input type='text' id='key' onChange={(event) => { setProjectKey(event.target.value); }} />
            </label>
            <label>
              URL
              <input type='text' id='projectLink' onChange={(event) => { setProjectLink(event.target.value); }} />
            </label>
            <label>
              Repository
              <input type='text' id='repository' onChange={(event) => { setRepository(event.target.value); }} />
            </label>
            <label>
              Lead
              <input type='text' id='projectLead' onChange={(event) => { setProjectLead(event.target.value); }}/>
            </label>
          </div>
          <div className='bottom-form-container'>
            <label>
              Date
              <input type='text' id='date' onChange={(event) => { setStartDate(event.target.value); }} />
            </label>
            <label>
              Project Type
              <input type='text' id='projectType' onChange={(event) => { setProjectType(event.target.value); }} />
            </label>
            <label>
              Description
              <input type='text' id='description' onChange={(event) => { setDescription(event.target.value); }} />
            </label>
            <label>
              Image
              <input type='text' id='image' onChange={(event) => { setProjectImage(event.target.value); }} />
            </label>
          </div>
        </div>
      }
      {
        handleAdminAuth(user)
        ? <button className='start-button' onClick={() => { addProject(); }}>Start</button>
        : <button className='start-button'>Start</button>
      }
    </StyledProjectPage>
  );
}

const StyledProjectPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  width: 100%;
  max-width: 1000px;
  margin: 50px auto;
  position: relative;
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
  h1 {
    color: white;
    width: 100%;
    margin: 10px auto;
    font-size: ${palette.titleSize};
    @media (max-width: 750px) {
      font-size: ${palette.subtitleSize};
    }
  }
  .form-wrapper {
    width: 100%;
    margin: 10px auto;
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
        flex-direction: column;
        margin: 10px 0;
        color: white;
        @media (max-width: 750px) {
          font-size: ${palette.labelSize};
        }
        @media (max-width: 428px) {
          font-size: 1em;
          margin: 10px 0;
        }
        input {
          width: 400px;
          font-size: 1em;
          padding: 2px;
          background: ${palette.helperGrey};
          @media (max-width: 834px) {
            width: 100%;
          }
          @media (max-width: 428px) {
            height: 30px;
          }
        }
      }
    }
  }
  .start-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: ${palette.subtitleSize};
    font-weight: 700;
    background: #ffffff;
    color: ${palette.accentColor};
    &:hover {
      color: #ffffff;
      cursor: pointer;
      background: #000000;
      transition: 0.2s;
      transform: scale(1.01);
    }
    @media (max-width: 750px) {
      width: 100px;
      font-size: ${palette.paraSize};
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CreateProjectPage);