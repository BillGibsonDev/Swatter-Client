import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../styled/ThemeVariables.js";

// router
import { useParams } from "react-router-dom";

// functions
import { handleAlert } from "../../functions/handleAlert.js";

// components
import Loader from "../../loaders/Loader.js";
import { Alert } from "../../components/Alert.js";
import { Selector } from './components/Selector.js';
import { BreadCrumbs } from '../../components/Breadcrumbs.js';
import { DescriptionBox } from './components/DescriptionBox.js';
import { Images } from './components/Images.js';
import ButtonContainer from './components/ButtonContainer.js';

// redux
import { connect } from "react-redux";

const CreateBugPage = ({ user }) => {
  const { projectId } = useParams();

  const AlertRef = useRef();
  
  const [ message, setMessage ] = useState('');

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState(user.username);
  const [priority, setPriority] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [sprint, setSprint] = useState("");
  const [sprintOptions, setSprintOptions] = useState([]);
  const [ project, setProject ] = useState({})

  useEffect(() => {
    const getProject = (projectId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setProject(response.data)
        setSprintOptions(response.data.sprints);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getProject(projectId);
  }, [projectId]);

  const createBug = () => {
    if(!title || !status){
      setMessage(`Title and Status are required!`);
      handleAlert(AlertRef);
    } else {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_ADD_BUG_URL}/${projectId}/bugs`,
        {
          projectId: projectId,
          title: title,
          description: description,
          status: status,
          author: author,
          priority: priority,
          tag: tag,
          role: user.role,
          sprint: sprint,
          images: images,
        }
      )
      .then((response) => {
        if (response.data !== "Bug Created") {
          setLoading(false);
          setMessage("Server Error - Bug not created");
          handleAlert(AlertRef);
        } else {
          setLoading(false);
          setMessage(`Bug Added!`);
          handleAlert(AlertRef);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMessage("Server Error - Bug not created");
        handleAlert(AlertRef);
      })
    }
  };

  const [images, setImages] = useState([
    {
      image: "",
      caption: "",
    },
  ]);

  const sections = [ 'Tag', 'Priority', 'Status', 'Sprint' ];

  return (
    <StyledAddBug>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <BreadCrumbs
        projectId={projectId}
        projectTitle={project.projectTitle}
        title={'Create'}
      />
      <h1>Create Bug</h1>
      {
      !user ? <h1>You are signed out</h1>
      : isLoading ? <Loader />
      : 
        <div className='form-wrapper'>
          <label>
            Title
            <input type='text' id='title' onChange={(event) => { setTitle(event.target.value); }} />
          </label>
          <label>
            Created By
            <input readOnly defaultValue={user.username} type='text' id='author' onChange={(event) => {
                setAuthor(event.target.value);
              }}
            />
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

export default connect(mapStateToProps)(CreateBugPage);