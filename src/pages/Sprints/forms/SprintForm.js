import { useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// functions
import { handleAlert } from "../../../functions/handleAlert.js";
import { toggleRef } from "../../../functions/toggleRef.js";
import { handleUserAuth } from "../../../functions/handleUserAuth.js";

// redux
import { connect } from "react-redux";

// components
import { Alert } from "../../../components/Alert.js";

const SprintForm = ({ projectId, sprintFormRef, rerender, setRerender, user }) => {

  const AlertRef = useRef();

  const [ message, setMessage ] = useState('');
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("");

  const handleSprintForm = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_CREATE_SPRINT_URL}/${projectId}`,
      {
        projectId: projectId,
        goal: goal,
        title: title,
        endDate: endDate,
        color: color,
        status: status,
      }
    )
    .then((response) => {
      if (response.data !== "Sprint Created") {
        setMessage("Server Error - Sprint not created");
        handleAlert(AlertRef);
      } else {
        setMessage("Sprint Created!");
        handleAlert(AlertRef);
        setRerender(!rerender);
        toggleRef(sprintFormRef);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <StyledSprintForm ref={sprintFormRef} style={{ display: "none" }}>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <div className='title-container'>
        <h1>New Sprint</h1>
        <button id='exit-btn' onClick={() => { toggleRef(sprintFormRef); }}>
          &times;<span className='tooltiptext'>Close</span>
        </button>
      </div>
      <label>
        Title
        <input type='text' id='title' onChange={(event) => { setTitle(event.target.value);}} />
      </label>
      <label>
        Goal
        <textarea type='text' id='goal' onChange={(event) => { setGoal(event.target.value); }} />
      </label>
      <label>
        Status
        <select name='status' defaultValue={"Active"} onChange={(event) => { setStatus(event.target.value);}}>
          <option value='Active'>Active</option>
          <option value='Completed'>Completed</option>
        </select>
      </label>
      <label>
        End Date
        <input type='date' id='end-date' onChange={(event) => { setEndDate(event.target.value); }}/>
      </label>
      <label>
        Color Code
        <input defaultValue={"#000000"} type='text' id='color-code'
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
      </label>
      {
        handleUserAuth(user)
        ? <button onClick={() => { handleSprintForm(); }}>Save</button>
        : <button>Save</button>
      }
    </StyledSprintForm>
  );
};

const StyledSprintForm = styled.div`
  height: 100%;
  width: 90vw;
  margin: 0 auto;
  max-width: 500px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  left: 5%;
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
    select,
    input,
    textarea {
      margin-left: 6px;
      padding: 2px 4px;
    }
  }
  button {
    cursor: pointer;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SprintForm);