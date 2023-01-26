import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../styled/ThemeVariables.js";

// router
import { Link, useParams } from "react-router-dom";

// functions
import { handleAlert } from "../functions/handleAlert.js";
import { handleUserAuth } from "../functions/handleUserAuth.js";

// components
import Loader from "../loaders/Loader";
import { Alert } from "../components/Alert.js";

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
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getProject = (projectId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setOptions(response.data.sprints);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getProject(projectId);
  }, [projectId]);

  const createBug = () => {
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
  };

  const [images, setImages] = useState([
    {
      image: "",
      caption: "",
    },
  ]);

  const handleAddFields = () => {
    const values = [...images];
    values.push({ image: "", caption: "" });
    setImages(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...images];
    values.splice(index, 1);
    setImages(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...images];
    if (event.target.name === "image") {
      values[index].image = event.target.value;
    } else if (event.target.name === "caption") {
      values[index].caption = event.target.value;
    }
    setImages(values);
  };

  return (
    <StyledAddBug>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <div className='breadcrumbs'>
        <Link to={`/`}>Home</Link>
        <span>/</span>
        <Link to={`/projects/${projectId}`}>Project</Link>
        <span>/</span>
        <p>Create Bug</p>
      </div>
      <h1>Create Bug</h1>
      {
      !user ? <h1>You are signed out</h1>
      : isLoading ? <Loader />
      : 
        <div className='form-wrapper'>
          <div className='container-wrapper'>
            <div className='left-container'>
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
              <label>
                Sprint:
                { 
                  !options ? <></>
                  : <select id='sprint' onChange={(event) => { setSprint(event.target.value); }}>
                      <option value=''>None</option>
                      {
                        options.map((sprint, key) => {
                          return (
                            <option key={key} value={`${sprint.title}`}>
                              {sprint.title}
                            </option>
                          );
                        })
                      }
                  </select>
                }
              </label>
            </div>
            <div className='right-container'>
              <label>
                Priority
                <select id='status' onChange={(event) => { setPriority(event.target.value); }}>
                  <option value=''></option>
                  <option value='Standard'>Standard</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                </select>
              </label>
              <label>
                Status
                <select id='status' onChange={(event) => { setStatus(event.target.value); }}>
                  <option value=''></option>
                  <option value='Open'>Open</option>
                  <option value='Underway'>Underway</option>
                  <option value='Reviewing'>Reviewing</option>
                  <option value='Completed'>Completed</option>
                </select>
              </label>
              <label>
                Tag
                <select id='status' onChange={(event) => { setTag(event.target.value); }}>
                  <option value=''></option>
                  <option value='Bug'>Bug</option>
                  <option value='Enhancement'>Enhancement</option>
                  <option value='Feature'>Feature</option>
                  <option value='Redesign'>Redesign</option>
                  <option value='Task'>Task</option>
                </select>
              </label>
            </div>
          </div>
          <label>
            Description
            <textarea
              type='text'
              cols='30'
              rows='10'
              id='description'
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </label>
          {images.map((image, index) => {
            return (
              <div className='image-container' key={index}>
                <img
                  className='preview-image'
                  id='image'
                  src={image.image}
                  alt={image.caption}
                />
                <div className='input-container'>
                  <label>
                    Image
                    <input
                      type='text'
                      id='image'
                      name='image'
                      defaultValue={image.image}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </label>
                  <label>
                    Caption
                    <input
                      type='text'
                      id='caption'
                      name='caption'
                      defaultValue={image.caption}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </label>
                  <button id='delete' onClick={() => { handleRemoveFields(index); }}>Remove</button>
                </div>
              </div>
            );
          })}
          <button className='add-images-button' onClick={() => { handleAddFields(); }}>Add Image</button>
          {
            handleUserAuth(user)
            ? <button style={{ marginTop: "40px" }} onClick={() => { createBug(); }}>Save</button>
            : <button style={{ marginTop: "40px" }}>Save</button>
          }
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
  .breadcrumbs {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    @media (max-width: 428px) {
      display: none;
    }
    a {
      border: none;
      background: none;
      font-size: 16px;
      color: ${palette.helperGrey};
      cursor: pointer;
      @media (max-width: 450px) {
        font-size: 12px;
      }
      &:hover {
        color: white;
      }
    }
    p {
      font-size: 16px;
      color: ${palette.helperGrey};
      @media (max-width: 450px) {
        font-size: 12px;
      }
    }
    span {
      margin: 0 10px;
      color: white;
    }
  }
  h1 {
    color: white;
    font-size: 30px;
    margin: 10px 0;
    @media (max-width: 450px) {
      font-size: 20px;
    }
  }
  .form-wrapper {
    width: 100%;
    height: 100%;
    margin: 20px auto;
    @media (max-width: 450px) {
      margin: 10px auto;
    }
    .container-wrapper {
      display: flex;
      width: 100%;
      @media (max-width: 800px) {
        flex-direction: column;
      }
      .right-container,
      .left-container {
        width: 45%;
        @media (max-width: 800px) {
          width: 100%;
        }
      }
      .right-container {
        margin-left: auto;
        @media (max-width: 800px) {
          margin: 0;
        }
      }
    }
    label {
      display: flex;
      color: white;
      flex-direction: column;
      margin: 10px 0;
      font-size: ${palette.labelSize};
      @media (max-width: 750px) {
        font-size: 14px;
      }
      @media (max-width: 450px) {
        margin: 10px 0;
      }
      input,
      select {
        width: 100%;
        height: 30px;
        padding: 2px;
        background: ${palette.helperGrey};
      }
      textarea {
        padding: 10px;
        background: ${palette.helperGrey};
      }
    }
    .image-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      height: 300px;
      width: 100%;
      @media (max-width: 428px) {
        flex-direction: column;
      }
      img {
        width: 40%;
        height: 100%;
        @media (max-width: 428px) {
          width: 90%;
        }
      }
      .input-container {
        width: 50%;
        @media (max-width: 428px) {
          width: 90%;
        }
        label {
          display: flex;
          color: white;
          flex-direction: column;
          margin: 10px 0;
          font-size: ${palette.labelSize};
          @media (max-width: 750px) {
            font-size: 14px;
          }
          @media (max-width: 450px) {
            margin: 10px 0;
          }
          input {
            width: 100%;
            height: 30px;
            padding: 2px;
            background: ${palette.helperGrey};
          }
        }
      }
    }
    .add-images-button {
      background: none;
      border: 2px solid white;
      color: white;
      font-size: 16px;
    }
    .buttons-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      #remove-button {
        background: none;
        border: red 1px solid;
        color: red;
      }
    }
    button {
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
      margin-top: 16px;
      transition: 0.2s;
      &:hover {
        color: #ffffff;
        cursor: pointer;
        background: #000000;
        transform: scale(1.01);
      }
      @media (max-width: 750px) {
        width: 100px;
        font-size: ${palette.paraSize};
      }
      @media (max-width: 450px) {
        font-size: 16px;
        width: 100px;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CreateBugPage);