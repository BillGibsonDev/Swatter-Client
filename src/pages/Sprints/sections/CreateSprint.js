import { useState } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from '../../../styled/ThemeVariables.js';

// redux
import { connect } from "react-redux";

const CreateSprint = ({ projectId, setCreating, user }) => {

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("");

  const handleCreateSprint = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/sprints/create`,
      {
        projectId: projectId,
        goal: goal,
        title: title,
        endDate: endDate,
        color: color,
        status: status,
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if (response.data === 200) {
        setCreating(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setCreating(false);
    });
  };

  const sprintColors = [ 'Black', 'Blue', 'Brown', 'Green', 'Lightblue', 'Lightgray', 'Lightgreen', 'Red', 'Purple', 'Yellow' ]

  return (
    <StyledCreateSprint>
      <div className='title-container'>
        <h1>New Sprint</h1>
        <button id='exit-btn' onClick={() => { setCreating(false); }}>
          Cancel
        </button>
      </div>
      <div className="form-wrapper">
      <div className="form-container">
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
        <select id="color" onChange={(event) => { setColor(event.target.value); }}>
          <option value=''>None</option>
          {
            sprintColors.map((color, key) => {
              return ( <option key={key} value={color.toLowerCase()}>{color}</option>)
            })
          }
        </select>
      </label>
      <button onClick={() => { handleCreateSprint(); }}>Create</button>
    </div>
    </div>
    </StyledCreateSprint>
  );
};

const StyledCreateSprint = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  min-height: 50vh;
  .title-container {
    display: flex;
    max-width: 500px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: white;
      font-size: ${palette.titleSize};
    }
    button {
      border: none;
      padding: 8px 16px;
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
          text-transform: capitalize;
          option {
            text-transform: capitalize;
          }
        }
        textarea {
          height: 100px;
        }
      }
      button {
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        margin-top: 20px;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CreateSprint);