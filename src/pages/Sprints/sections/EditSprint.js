import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// functions
import { handleDeleteAlert } from "../../../functions/handleDeleteAlert.js";

// redux
import { connect } from "react-redux";
import { showAlert } from "../../../redux/actions/alert";

// components
import { DeleteAlert } from "../../../components/DeleteAlert";
import Loader from "../../../loaders/Loader";

// functions
import { ButtonContainer }from "../components/ButtonContainer";
import { TitleContainer } from "../../../components/TitleContainer";

const EditSprint = ({ 
  user, 
  projectId, 
  editing,
  setEditing, 
  project, 
  searchSprint, 
  setSearchSprint, 
  showAlert
}) => {

  const DeleteAlertRef = useRef();

  const [ sprint, setSprint ] = useState([]);
  const [ sprintId, setSprintId ] = useState(false);

  useEffect(() => {
    if (searchSprint) {
      setSprintId(project.sprints.find((sprint) => sprint.title === searchSprint)._id);
    }
    const handleSprint = (projectId, sprintId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/sprints/${sprintId}`,
        {
          headers: {
            Authorization: user.token
          }
        })
      .then((response) => {
        setSprint(response.data);
        setLastTitle(response.data.title);
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
  const [ deadline, setDeadline ] = useState(sprint.deadline);
  const [ color, setColor ] = useState(sprint.color);
  const [ status, setStatus ] = useState(sprint.status);
  const [ lastTitle, setLastTitle ] = useState(sprint.title);

  const [ isLoading, setLoading ] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('A Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(30, 'Title cannot exceed 30 characters'),
    goal: Yup.string()
      .max(500, 'Descriptions can not exceed 500 characters')
  });

  const handleUpdateSprint = (event) => {
    event.preventDefault();
    validationSchema.validate({ title, goal })
    .then(() => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/sprints/${sprintId}/update`,
        {
          projectId: projectId,
          sprintId: sprintId,
          goal: goal,
          title: title,
          deadline: deadline,
          color: color,
          status: status,
          lastTitle: lastTitle
        },      
        {
          headers: {
            Authorization: user.token
          }
        },
      )
      .then((response) => {
        if(response.status === 200) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        showAlert(error, 'error');
      });
    })
    .catch((validationError) => {
      showAlert(validationError, 'error');
    });
  };

  const handleDeleteSprint = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/sprints/${sprintId}/delete`,
      {
        sprintTitle: sprint.title,
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
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
      <TitleContainer 
        title={'Create Sprint'} 
        stateChanger={setEditing} 
        state={editing} 
        type={'cancel'} 
      />
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
            defaultValue={sprint.deadline}
            id='deadline'
            onChange={(event) => {
              setDeadline(event.target.value);
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
  width: 100%;
  max-width: 1000px;
  min-height: 50vh;
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

const mapDispatchToProps = {
  showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSprint);