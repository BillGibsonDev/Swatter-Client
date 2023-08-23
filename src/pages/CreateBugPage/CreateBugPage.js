import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../styled/ThemeVariables.js";

// router
import { useParams } from "react-router-dom";

// components
import Loader from "../../loaders/Loader.js";
import { Selector } from './components/Selector.js';
import BreadCrumbs from '../../components/Breadcrumbs.js';
import { DescriptionBox } from './components/DescriptionBox.js';
import { Images } from './components/Images.js';
import ButtonContainer from './components/ButtonContainer.js';

// redux
import { connect } from "react-redux";
import { showAlert } from "../../redux/actions/alert.js";

const CreateBugPage = ({ user, showAlert }) => {
  const { projectId } = useParams();

  const [ title, setTitle ] = useState("");
  const [ status, setStatus ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ priority, setPriority ] = useState("");
  const [ tag, setTag ] = useState("");
  const [ isLoading, setLoading ] = useState(false);
  const [ sprint, setSprint ] = useState("");
  const [ sprintOptions, setSprintOptions ] = useState([]);
  const [ project, setProject ] = useState({});
  const [ images, setImages ] = useState([]);

  const sections = [ 'Status', 'Tag', 'Priority', 'Sprint' ];

  useEffect(() => {
    const getProject = (projectId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}`,  {
        headers: {
          Authorization: user.token,
        }
      })
      .then((response) => {
        setProject(response.data);
        setSprintOptions(response.data.sprints);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getProject(projectId);
  }, [ user, projectId ]);

  const handleAlert = ( message, type ) => {
    showAlert(message, type);
  }

  const createBug = () => {
    if(!title){ handleAlert('Title', 'warning'); return; }; 
    if(!status){ handleAlert('Status', 'warning'); return; }; 
    if(!tag){ handleAlert('Tag', 'warning'); return; }; 
    if(!priority){ handleAlert('Priority', 'warning'); return; }; 
    if(!description){ handleAlert('Description', 'warning'); return; }; 
    setLoading(true);
    let checkImages = images.filter(image => image.image !== '');
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/bugs/create`,
      {
        title,
        description,
        status,
        priority,
        tag,
        sprint,
        checkImages,
        author: user.username
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if(response.status === 200) {
        setLoading(false);
        handleAlert('Bug created', 'success');
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      handleAlert(error, 'error');
    })
  };

  return (
    <StyledAddBug>
      <BreadCrumbs
        projectId={projectId}
        projectTitle={project.title}
        title={'Create'}
      />
      <h1>Create Bug</h1>
      {
        isLoading ? <Loader />
        : <div className='form-wrapper'>
          <label>
            Title
            <input type='text' id='title' onChange={(event) => { setTitle(event.target.value); }} />
          </label>
          <label>
            Created By
            <input readOnly defaultValue={user.username} type='text' id='author' />
          </label>
          {
            sections.map((section, key) =>{
              return (
                <Selector
                  key={key}
                  label={section}
                  setTag={setTag}
                  setPriority={setPriority}
                  setStatus={setStatus}
                  setSprint={setSprint}
                  sprintOptions={sprintOptions}
                />
              )
            })
          }
          <DescriptionBox
            setDescription={setDescription}
          />
          <Images
            images={images}
            setImages={setImages}
          />
          <ButtonContainer 
            createBug={createBug}
          />
        </div>
      }
    </StyledAddBug>
  );
}

const StyledAddBug = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 96vh;
  height: 100%;
  width: 70%;
  margin: 20px auto;
  @media (max-width: 834px) {
    width: 80%;
    height: 100%;
    border-radius: 0;
  }
  @media (max-width: 428px) {
    margin-left: 60px;
    padding: 10px;
  }
  h1 {
    color: white;
    font-size: 2em;
    margin: 10px 0;
  }
  .form-wrapper {
    width: 100%;
    height: 100%;
    margin: 20px auto;
    @media (max-width: 450px) {
      margin: 10px auto;
    }
    label {
      display: flex;
      color: white;
      flex-direction: column;
      margin: 10px 0;
      font-size: ${palette.labelSize};
      width: 100%;
      max-width: 500px;
      font-size: 1em;
      margin: 10px 0;
      }
      input, select {
        width: 100%;
        height: 30px;
        padding: 2px;
        background: ${palette.helperGrey};
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBugPage);