import { useEffect, useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../styled/ThemeVariables.js";

// functions
import { unauthorized } from "../functions/unauthorized.js";
import { handleAlert } from "../functions/handleAlert.js";
import { handleDeleteAlert } from "../functions/handleDeleteAlert.js";

// components
import BugPageLoader from "../loaders/BugPageLoader";
import { DeleteAlert } from "../components/DeleteAlert.js";
import { Alert } from '../components/Alert.js';

// router
import { Link, useNavigate, useParams } from "react-router-dom";

// redux
import { connect } from "react-redux";

const EditBugPage = ({ user }) => {

  const AlertRef = useRef();
  const DeleteAlertRef = useRef();

  const navigate = useNavigate();

  const { projectId, bugId } = useParams();

  const [ message, setMessage ] = useState('');
  const [author, setAuthor] = useState("");
  const [bug, setBug] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    const getSprints = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setOptions(response.data.sprints);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    const getBug = (projectId, bugId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
      .then((response) => {
        setBug(response.data[0].bugs[0]);
        setOptions(response.data);
        setAuthor(response.data[0].bugs[0].author);
        setImages(response.data[0].bugs[0].images);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getSprints(projectId);
    getBug(projectId, bugId);
  }, [projectId, bugId, isLoading, rerender]);

  const [status, setStatus] = useState(bug.status);
  const [description, setDescription] = useState(bug.description);
  const [priority, setPriority] = useState(bug.priority);
  const [tag, setTag] = useState(bug.tag);
  const [sprint, setSprint] = useState(bug.sprint);

  const updateBug = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_UPDATE_BUG_URL}/${projectId}/${bugId}`,
      {
        description: description,
        status: status,
        tag: tag,
        priority: priority,
        projectId: projectId,
        bugId: bug._id,
        sprint: sprint,
        images: images,
      }
    )
    .then((response) => {
      if (response.data !== "Bug Updated") {
        setMessage(`Server Error - Bug Not Updated!`);
        setLoading(false);
        handleAlert(AlertRef);
      } else {
        setMessage(`Bug updated!`);
        setLoading(false);
        handleAlert(AlertRef);
      }
    })
    .catch((err) => {
      console.log(err);
      setMessage(`Server Error - Bug Not Updated!`);
      setLoading(false);
      handleAlert(AlertRef);
    })
  };

  const deleteBug = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_BUG_URL}/${projectId}/${bugId}`)
    .then((response) => {
      if (response.data !== "Bug Deleted") {
        setMessage(`Server Error - Bug Not Deleted!`);
        setLoading(false);
        handleAlert(AlertRef);
      } else {
        setMessage(`Bug Deleted!`);
        setLoading(false);
        handleAlert(AlertRef);
        navigate(`/projects/${projectId}`);
      }
    })
    .catch((err) => {
      console.log(err);
      setMessage(`Server Error - Bug Not Deleted!`);
      setLoading(false);
      handleAlert(AlertRef);
    })
  };

  const handleAddFields = () => {
    const values = [...images];
    values.push({ caption: "", image: "" });
    setImages(values);
  };

  const handleRemoveFields = (index) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result === true) {
      const values = [...images];
      values.splice(index, 1);
      setImages(values);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...images];
    if (event.target.id === "image") {
      values[index].image = event.target.value;
    } else if (event.target.id === "caption") {
      values[index].caption = event.target.value;
    }
    setImages(values);
  };

  return (
    <StyledBugSection>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteBug}
        title={bug.title}
      />
      <div className='breadcrumbs'>
        <Link to={`/`}>Home</Link>
        <span>/</span>
        <Link to={`/projects/${projectId}`}>Project</Link>
        <span>/</span>
        { !bug ? <></> : <p>{bug.title}</p> }
      </div>
      {isLoading ? <BugPageLoader />
      : 
        <div className='bug-container'>
          <h1>{bug.title}</h1>
          <div className='info-wrapper'>
            <div className='info-container'>
              <h2><span>Creator: </span>{bug.author}</h2>
              <h2><span>Created: </span>{bug.date}</h2>
              <h2><span>Updated: </span>{bug.lastUpdate}</h2>
            </div>
            <div className='selector-container'>
              <label>
                Tag:
                <select id='tag' defaultValue={bug.tag} onChange={(event) => { setTag(event.target.value);}}>
                  <option value={bug.tag}>{bug.tag}</option>
                  <option value='Bug'>Bug</option>
                  <option value='Feature'>Feature</option>
                  <option value='Enhancement'>Enhancement</option>
                  <option value='Task'>Task</option>
                </select>
              </label>
              <label>
                Priority:
                <select id='priority' defaultValue={bug.priority} onChange={(event) => {setPriority(event.target.value); }}>
                  <option value={bug.priority}>{bug.priority}</option>
                  <option value='Standard'>Standard</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                </select>
              </label>
              <label>
                Status:
                <select id='status' defaultValue={bug.status} onChange={(event) => { setStatus(event.target.value); }}>
                  <option value={bug.status}>{bug.status}</option>
                  <option value='Open'>Open</option>
                  <option value='Underway'>Underway</option>
                  <option value='Reviewing'>Reviewing</option>
                  <option value='Completed'>Completed</option>
                </select>
              </label>
              <label>
                Sprint:
                <select id='sprint' defaultValue={bug.sprint} onChange={(event) => { setSprint(event.target.value); }}>
                  <option value={bug.sprint}>{bug.sprint}</option>
                  {options.map((sprint, key) => {
                    return (
                      <option key={key} value={`${sprint.title}`}>
                        {sprint.title}
                      </option>
                    );
                  })}
                  <option value=''>None</option>
                </select>
              </label>
            </div>
          </div>
          <label>
            Description
            <textarea
              name='description'
              id='description'
              key={bug.description}
              defaultValue={bug.description}
              cols='30'
              rows='10'
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </label>
          <img src={bug.thumbnail} alt={bug.title} />
        </div>
      }
      <h2>Images:</h2>
      {
      !images 
      ? <h1>No Images Yet</h1>
      : 
        <div className='images-wrapper'>
          {
            images.map((image, index) => {
              return (
                <div className='image-container' key={index}>
                  <img className='preview-image' id='image' src={image.image} alt={image.caption}/>
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
                    <button id='delete' onClick={() => { handleRemoveFields(index);}}>Remove</button>
                  </div>
                </div>
              );
            })
          }
        </div>
      }
      <button className='add-images-button' onClick={() => { handleAddFields(); }}>Add Image</button>
      <div className='button-container'>
        {
          author === user.username || user.role === process.env.REACT_APP_ADMIN_SECRET 
          ? <>
              <button onClick={() => { updateBug(); setRerender(!rerender); }}>Save</button>
              <button id='delete'onClick={() => { handleDeleteAlert(DeleteAlertRef); }}>Delete</button>
            </>
          : <>
            <button onClick={() => { unauthorized(); }}>Save</button>
            <button id='delete' onClick={() => { unauthorized(); }}>Delete</button>
          </>
        }
      </div>
    </StyledBugSection>
  );
}

const StyledBugSection = styled.div`
  height: 100%;
  width: 70%;
  margin: 30px auto;
  @media (max-width: 834px) {
    width: 100%;
  }
  @media (max-width: 428px) {
    width: 80%;
    margin-left: 60px;
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
      color: ${pallette.helperGrey};
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
      color: ${pallette.helperGrey};
      @media (max-width: 450px) {
        font-size: 12px;
      }
    }
    span {
      margin: 0 10px;
      color: white;
    }
  }
  .bug-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    h1 {
      color: white;
      font-size: 30px;
      margin: 10px 0;
      @media (max-width: 450px) {
        font-size: 20px;
      }
    }
    .info-container,
    .selector-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      width: 100%;
      margin: 10px 0 10px 0;
      @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      h2 {
        color: white;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 10px 0;
        font-weight: 400;
        span {
          color: #cecece;
          font-weight: 400;
          font-size: 16px;
          @media (max-width: 450px) {
            font-size: 12px;
          }
        }
      }
      label {
        display: flex;
        flex-direction: column;
        color: white;
        margin: 10px 0;
        font-weight: 400;
        font-size: ${pallette.labelSize};
        @media (max-width: 750px) {
          font-size: 14px;
        }
        @media (max-width: 450px) {
          margin: 10px 0;
        }
        select {
          cursor: pointer;
          width: 90%;
          font-size: 16px;
          background: ${pallette.helperGrey};
          font-weight: 400;
          @media (max-width: 450px) {
            font-size: 14px;
          }
        }
      }
    }
    img {
      width: 300px;
    }
  }
  label {
    display: flex;
    color: white;
    flex-direction: column;
    margin: 10px 0;
    font-size: ${pallette.labelSize};
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
      background: ${pallette.helperGrey};
    }
    textarea {
      padding: 10px;
      background: ${pallette.helperGrey};
    }
  }
  h2 {
    color: white;
    font-size: 16px;
    font-weight: 400;
    margin-top: 20px;
  }
  .images-wrapper {
    display: flex;
    flex-direction: column;
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
          font-size: ${pallette.labelSize};
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
            background: ${pallette.helperGrey};
          }
        }
      }
    }
  }
  .add-images-button {
    background: none;
    border: 2px solid white;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding: 6px;
    &:hover {
      background: black;
    }
  }
  .button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    button {
      width: 200px;
      height: 40px;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 18px;
      transition: 0.2s;
      @media (max-width: 1050px) {
        margin: 10px 0;
        width: 150px;
      }
      @media (max-width: 450px) {
        font-size: 16px;
        width: 100px;
        margin-bottom: 0;
      }
      &:hover {
        color: #ffffff;
        background: #000000;
        transform: scale(1.05);
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditBugPage);