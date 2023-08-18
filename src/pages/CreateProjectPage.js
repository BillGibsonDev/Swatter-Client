import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../styled/ThemeVariables.js";

// functions
import { handleAlert } from "../functions/handleAlert.js";

// components
import Loader from "../loaders/Loader";
import { Alert } from "../components/Alert.js";
import { BreadCrumbs } from "../components/Breadcrumbs.js";

// reduxSwatt
import { connect } from "react-redux";

const CreateProjectPage = ({ user }) => {

  const AlertRef = useRef();
  
  const [ message, setMessage ] = useState('');

  const [ title, setTitle ] = useState("");
  const [ startDate, setStartDate ] = useState("");
  const [ link, setLink ] = useState("");
  const [ image, setImage ] = useState("");
  const [ isLoading, setLoading ] = useState(false);
  const [ description, setDescription ] = useState("");
  const [ repository, setRepository ] = useState("");
  const [ lead, setLead ] = useState("");
  const [ type, setType ] = useState("");

  useEffect(() => {
    const handleDate = () => {
      const current = new Date();
      const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
      setStartDate(date);
    };
    handleDate();
  }, [user]);

  const createProject = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects`,
      {
        title,
        startDate,
        author: user.username,
        link,
        image,
        repository: repository,
        description: description,
        projectKey: title.slice(0,2).toUpperCase(),
        lead,
        type,
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if(response.status === 200){
        setLoading(false);
        setMessage(`${title} Project Started!`);
        handleAlert(AlertRef);
      } else {
        setLoading(false);
        setMessage("Server Error - Project not created");
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
              <input type='text' id='title' onChange={(event) => { setTitle(event.target.value); }} />
            </label>
            <label>
              URL
              <input type='text' id='link' onChange={(event) => { setLink(event.target.value); }} />
            </label>
            <label>
              Repository
              <input type='text' id='repository' onChange={(event) => { setRepository(event.target.value); }} />
            </label>
            <label>
              Lead
              <input type='text' id='lead' onChange={(event) => { setLead(event.target.value); }}/>
            </label>
          </div>
          <div className='bottom-form-container'>
            <label>
              Date
              <input type='text' id='date' onChange={(event) => { setStartDate(event.target.value); }} />
            </label>
            <label>
              Project Type
              <input type='text' id='type' onChange={(event) => { setType(event.target.value); }} />
            </label>
            <label>
              Description
              <input type='text' id='description' onChange={(event) => { setDescription(event.target.value); }} />
            </label>
            <label>
              Image
              <input type='text' id='image' onChange={(event) => { setImage(event.target.value); }} />
            </label>
          </div>
        </div>
      }
      <button className='start-button' disabled={isLoading} onClick={() => { createProject(); }}>Start</button>
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