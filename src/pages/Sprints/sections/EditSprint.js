import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// functions
import { handleDeleteAlert } from "../../../functions/handleDeleteAlert.js";

// redux
import { connect } from "react-redux";

// components
import { DeleteAlert } from "../../../components/DeleteAlert";
import Loader from "../../../loaders/Loader";

// functions
import { ButtonContainer }from "../components/ButtonContainer";

const EditSprint = ({ user, projectId, setEditing, project, searchSprint, setSearchSprint }) => {

  const DeleteAlertRef = useRef();

  const [ sprint, setSprint ] = useState([]);
  const [ sprintId, setSprintId ] = useState(false);

  useEffect(() => {
    if (searchSprint) {
      setSprintId(project.sprints.find((sprint) => sprint.title === searchSprint)._id);
    }
    const handleSprint = (projectId, sprintId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/sprints/${sprintId}`)
      .then((response) => {
        setSprint(response.data.sprints[0]);
        setLastTitle(response.data.sprints[0].title)
      })
      .catch((err) => {
        console.log(err);
      });
    };
    if (sprintId) {
      handleSprint(projectId, sprintId);
    }
  }, [ user, project, projectId, searchSprint, sprintId ]);

  const [ title, setTitle ] = useState(sprint.title);
  const [ goal, setGoal ] = useState(sprint.goal);
  const [ endDate, setEndDate ] = useState(sprint.endDate);
  const [ color, setColor ] = useState(sprint.color);
  const [ status, setStatus ] = useState(sprint.status);
  const [ lastTitle, setLastTitle ] = useState(sprint.title);

  const [ isLoading, setLoading ] = useState(false);

  const handleUpdateSprint = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/sprints/${sprintId}/update`,
      {
        headers: {
          Authorization: user.token
        }
      },
      {
        projectId: projectId,
        sprintId: sprintId,
        goal: goal,
        title: title,
        endDate: endDate,
        color: color,
        status: status,
        lastTitle: lastTitle
      }
    )
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleDeleteSprint = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/project/${projectId}/sprints/${sprintId}/delete`,
      {
        sprintTitle: sprint.title
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if (response.data === 200) {
        setLoading(false);
        setSearchSprint('');
        setEditing(false);
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  };

  const sprintColors = [ 'Black', 'Blue', 'Brown', 'DarkRed', 'Green', 'Olive', 'Red', 'Slateblue', 'Tomato', 'Purple']

  const handleSprintColor = (myColor) => {
    if(myColor){
      return myColor.toLowerCase();
    }
  }

  if ( isLoading ){
    return <Loader />
  }
  return (
    <StyledEditSprint>
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={handleDeleteSprint}
        title={sprint.title}
      />
      <div className='title-container'>
        <h1>Edit {sprint.title}</h1>
        <button id='exit-btn' onClick={() => { setEditing(false) }}>Cancel</button>
      </div>
      <div className="form-wrapper">
        <div className='form-container'>
        <label>
          Title
          <input
            type='text'
            id='title'
            defaultValue={sprint.title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </label>
        <label>
          Goal
          <textarea
            defaultValue={sprint.goal}
            type='text'
            id='goal'
            onChange={(event) => {
              setGoal(event.target.value);
            }}
          />
        </label>
        <label>
          Status
          <select
            name='status'
            defaultValue={sprint.status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <option value='Active'>Active</option>
            <option value='Completed'>Completed</option>
          </select>
        </label>
        <label>
          End Date
          <input
            type='date'
            defaultValue={sprint.endDate}
            id='end-date'
            onChange={(event) => {
              setEndDate(event.target.value);
            }}
          />
        </label>
        <label>
          Color Code
          <select id="color" value={handleSprintColor(color)} onChange={(event) => { setColor(event.target.value); }}>
            {
              sprintColors.map((color, key) => {
                return ( <option key={key} value={color.toLowerCase()}>{color}</option>)
              })
            }
          </select>
        </label>
        </div>
      </div>
      <ButtonContainer 
        handleUpdateSprint={handleUpdateSprint}
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
      />
    </StyledEditSprint>
  );
};

const StyledEditSprint = styled.section`
 display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  min-height: 50vh;
  .title-container {
    display: flex;
    width: 100%;
    max-width: 500px;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: white;
      font-size: ${palette.titleSize};
    }
    button {
      width: 100px;
      border: none;
      padding: 8px 0;
      cursor: pointer;
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
      width: 100%;
      max-width: 500px;
      label {
        display: flex;
        color: white;
        flex-direction: column;
        margin: 10px 0;
        width: 100%;
        max-width: 500px;
        input, select, textarea {
          width: 100%;
          padding: 2px;
          font-size: .8em;
          background: ${palette.helperGrey};
          height: 30px;
        }
        textarea {
          height: 100px;
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

export default connect(mapStateToProps)(EditSprint);