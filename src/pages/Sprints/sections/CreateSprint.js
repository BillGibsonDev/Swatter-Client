import { useState } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import { StyledButton } from "../../../styled/StyledButton.js";

// redux
import { connect } from "react-redux";
import { showAlert } from "../../../redux/actions/alert.js";

// components
import { TitleContainer } from "../../../components/TitleContainer.js";
import { InputFields } from "../../../components/InputFields.js";

const CreateSprint = ({ showAlert, projectId, creating, setCreating, user }) => {

  const [ title, setTitle ] = useState("");
  const [ goal, setGoal ] = useState("");
  const [ deadline, setDeadline ] = useState("");
  const [ color, setColor ] = useState("");
  const [ status ] = useState("Active");

  const createSprint = () => {
    if(!title){ handleAlert('Title', 'warning'); return; }; 
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/sprints/create`,
      {
        goal: goal,
        title: title,
        deadline: deadline,
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
      if (response.status === 200) {
        setCreating(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setCreating(false);
    });
  };

  const sprintColors = [ 
    'Black', 
    'Blue', 
    'Brown', 
    'Green', 
    'Lightblue', 
    'Lightgray', 
    'Lightgreen', 
    'Red', 
    'Purple', 
    'Yellow'
  ];

  const handleAlert = ( message, type ) => {
    showAlert(message, type);
  };

  const inputFields = [
    { 
      label: 'Title',
      required: true,
      func: setTitle,
      type: 'text',
    },
    { 
      label: 'Goal',
      required: false,
      func: setGoal,
      type: 'textarea',
    },
    { 
      label: 'Deadline',
      required: false,
      func: setDeadline,
      type: 'date',
    },
    { 
      label: 'Color Code',
      required: false,
      func: setColor,
      type: 'select',
      options: sprintColors
    },
  ];

  return (
    <StyledCreateSprint>
      <TitleContainer 
        title={'Create Sprint'} 
        stateChanger={setCreating} 
        state={creating} 
        type={'cancel'} 
      />
      <div className="form-wrapper">
        {
          inputFields.map((input, index) => {
            return(
              <InputFields
                key={index}
                label={input.label}
                required={input.required}
                options={input.options}
                type={input.type}
                func={input.func}
              />
            )
          })
        }
        <StyledButton id="create-btn" onClick={() => { createSprint(); }}>Create</StyledButton>
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
  padding: 2px;
  .form-wrapper {
    width: 100%;
    margin: 16px auto;
    display: flex;
    flex-direction: column;
  }
  #create-btn {
    margin: 10px 0 0 0;
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateSprint);