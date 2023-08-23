import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../styled/ThemeVariables.js";
import { StyledButton } from "../styled/StyledButton.js";

// components
import Loader from "../loaders/Loader";
import { BreadCrumbs } from "../components/Breadcrumbs.js";

// redux
import { connect } from "react-redux";
import { showAlert } from "../redux/actions/alert.js";

// router
import { useNavigate } from "react-router-dom";

const CreateProjectPage = ({ user, showAlert }) => {

  const navigate = useNavigate();

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
      const date = `0${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
      setStartDate(date);
    };
    handleDate();
  }, [ user ]);

  const createProject = () => {
    if(!title){ showAlert('Title', 'warning'); return; };
    if(!startDate){ showAlert('Start Date', 'warning'); return; };
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/create`,
      {
        title,
        startDate,
        author: user.username,
        link,
        image,
        repository: repository,
        description: description,
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
  };

  return (
    <StyledProjectPage>
      <BreadCrumbs
        projectTitle={'Create Project'}
      />
      <h1>Start a Project</h1>
      {
        isLoading ? <Loader />
        : 
        <div className='form-wrapper'>
          <div className="inputs-container">
            <div className='top-form-container'>
              <label>Title
                <input type='text' id='title' onChange={(event) => { setTitle(event.target.value); }} />
              </label>
              <label>URL
                <input type='text' id='link' onChange={(event) => { setLink(event.target.value); }} />
              </label>
              <label>Repository
                <input type='text' id='repository' onChange={(event) => { setRepository(event.target.value); }} />
              </label>
              <label>Lead
                <input type='text' id='lead' onChange={(event) => { setLead(event.target.value); }}/>
              </label>
            </div>
            <div className='bottom-form-container'>
              <label>Date (MM/DD/YYYY)
                <input type='text' id='date' placeholder={startDate} onChange={(event) => { setStartDate(event.target.value); }} />
              </label>
              <label>Project Type
                <input type='text' id='type' onChange={(event) => { setType(event.target.value); }} />
              </label>
              <label>Image
                <input type='text' id='image' onChange={(event) => { setImage(event.target.value); }} />
              </label>
            </div>
          </div>
          <label id="description-label">Description
            <textarea id='description' onChange={(event) => { setDescription(event.target.value); }} />
          </label>
        </div>
      }
      <StyledButton disabled={isLoading} onClick={() => { createProject(); }}>Start</StyledButton>
    </StyledProjectPage>
  );
}

const StyledProjectPage = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  max-width: 1000px;
  margin: 1em auto;
  position: relative;
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
      .top-form-container,
      .bottom-form-container {
        width: 45%;
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
            max-width: 300px;
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