import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// functions

import { handleAlert } from "../../../functions/handleAlert.js";
import { handleDeleteAlert } from "../../../functions/handleDeleteAlert.js";

// redux
import { connect } from "react-redux";

// components
import { Alert } from "../../../components/Alert";
import { DeleteAlert } from "../../../components/DeleteAlert";

// functions
import { toggleRef } from "../../../functions/toggleRef";
import { handleUserAuth } from "../../../functions/handleUserAuth";

const EditSprintForm = ({
  projectId,
  editSprintFormRef,
  rerender,
  setRerender,
  project,
  searchSprint,
  user
}) => {

  const AlertRef = useRef();
  const DeleteAlertRef = useRef();

  const [ message, setMessage ] = useState('');
  const [sprint, setSprint] = useState([]);
  const [sprintId, setSprintId] = useState(false);

  useEffect(() => {
    if (searchSprint) {
      setSprintId(
        project.sprints.filter((sprints) => sprints.title === searchSprint)[0]._id
      );
    }
    const handleSprint = (projectId, sprintId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_SPRINT_URL}/${projectId}/${sprintId}`)
      .then((response) => {
        setSprint(response.data[0].sprints[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    if (sprintId) {
      handleSprint(projectId, sprintId);
    }
  }, [project, projectId, searchSprint, sprintId]);

  const [title, setTitle] = useState(sprint.title);
  const [goal, setGoal] = useState(sprint.goal);
  const [endDate, setEndDate] = useState(sprint.endDate);
  const [color, setColor] = useState(sprint.color);
  const [status, setStatus] = useState(sprint.status);

  const handleUpdateSprint = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_UPDATE_SPRINT_URL}/${projectId}/${sprintId}`,
      {
        projectId: projectId,
        sprintId: sprintId,
        goal: goal,
        title: title,
        endDate: endDate,
        color: color,
        status: status,
      }
    )
    .then((response) => {
      if (response.data !== "Sprint Updated") {
        setMessage("Server Error - Sprint not updated");
        handleAlert(AlertRef);
      } else {
        setMessage(`Sprint Updated!`);
        handleAlert(AlertRef);
        setRerender(!rerender);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleDeleteSprint = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_SPRINT_URL}/${projectId}/${sprintId}`,)
    .then(function (response) {
      if (response.data !== "Sprint Deleted") {
        setMessage("Server Error - Sprint Not Deleted!");
        handleAlert(AlertRef);
      } else {
        setMessage(`${sprint.title} Deleted!`);
        handleAlert(AlertRef);
      }
    });
  };

  return (
    <StyledSprintForm ref={editSprintFormRef} style={{ display: "none" }}>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={handleDeleteSprint}
        title={sprint.title}
      />
      <div className='title-container'>
        <h1>Edit Sprint</h1>
        <button id='exit-btn' onClick={() => { toggleRef(editSprintFormRef); }}>&times;<span className='tooltiptext'>Close</span></button>
      </div>
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
        <input
          type='text'
          defaultValue={sprint.color}
          id='color-code'
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
      </label>
      <div className='button-container'>
        {
          handleUserAuth(user) 
          ? <>
            <button onClick={() => { handleUpdateSprint(); }}>Save</button>
            <button id='delete' onClick={() => { toggleRef(editSprintFormRef); handleDeleteSprint();}}> Delete</button>
          </>
          : <>
            <button>Save</button>
            <button id='delete'>Delete</button>
          </>
        }
      </div>
    </StyledSprintForm>
  );
};

const StyledSprintForm = styled.div`
  height: 100%;
  width: 100%;
  max-width: 500px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  left: 10px;
  z-index: 1003;
  background: grey;
  border-radius: 8px;
  .title-container {
    display: flex;
    width: 95%;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    h1 {
      color: #ffffff;
    }
    #exit-btn {
      background: none;
      border: none;
      font-size: 40px;
      color: white;
      position: relative;
      cursor: pointer;
      #exit-btn-icon {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      .tooltiptext {
        visibility: hidden;
        width: 100%;
        min-width: 160px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1000;
        top: 25%;
        right: 105%;
        font-size: 20px;
      }
    }
    #exit-btn:hover .tooltiptext,
    #exit-btn:active .tooltiptext {
      visibility: visible;
      transition-delay: 1s;
    }
  }
  label {
    display: flex;
    margin: auto;
    input,
    textarea {
      padding: 2px 4px;
    }
  }
  .button-container {
    display: flex;
    width: 90%;
    justify-content: space-between;
    margin: auto;
    button {
      width: 200px;
      height: 40px;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: ${palette.subtitleSize};
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
        transition: 0.2s;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditSprintForm);