import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../../styled/ThemeVariables";

// components
import SprintBugTable from "./components/SprintBugTable.js";

// forms
import SprintForm from "./forms/SprintForm.js";
import EditSprintForm from "./forms/EditSprintForm.js";

// images
import Edit from "../../assets/icons/editIconWhite.png";

// loaders
import Loader from "../../loaders/Loader";

// router
import { useParams } from "react-router-dom";

// functions
import { toggleSprintForm } from "../../functions/toggleSprintForm";

export const SprintsPage = () => {
  const { projectId } = useParams();

  const sprintFormRef = useRef();
  const editSprintFormRef = useRef();

  const [searchSprint, setSearchSprint] = useState(false);
  const [options, setOptions] = useState([]);
  const [project, setProject] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getProject = (projectId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setProject(response.data);
        setOptions(response.data.sprints);
        if(response.data.sprints[0]){
          handleEndDate(response.data.sprints[0].endDate);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getProject(projectId);
  }, [projectId, rerender]);

  const handleEndDate = (x) => {
    let newArr = x.split(/[ -]+/);
    return `${newArr[1]}/${newArr[2]}/${newArr[0]}`;
  };

  return (
    <StyledSprintSection>
      <div className='button-wrapper'>
        <button onClick={() => { toggleSprintForm(sprintFormRef); }}>New Sprint</button>
        {
          !options
          ? <></>
          : 
            <select  onChange={(event) => { setSearchSprint(event.target.value); setRerender(!rerender);}}>
              <option value=''></option>
              {
                options.map((sprint, key) => {
                  return (
                    <option key={key} id={sprint._id} value={`${sprint.title}`}>
                      {sprint.title}
                    </option>
                  );
                })
              }
            </select>
        }
      </div>
      <div className='sprint-list-wrapper'>
        {
          !project.sprints ? <></>
          : 
          <>
            {
              project.sprints.filter((sprint) => sprint.title === searchSprint).map((sprint, key) => {
                return (
                  <div className='title-wrapper' key={key}>
                    <div className='title-container'>
                      <h4>{sprint.title}</h4>
                      <button onClick={() => { toggleSprintForm(editSprintFormRef); }} >
                        <img id='edit-button' src={Edit} alt='edit' />
                        <span className='tooltiptext'>Edit Sprint</span>
                      </button>
                    </div>
                    <h5 id='status'><span>Status: </span>{sprint.status}</h5>
                    <div className='info-container'>
                      <h5><span>Updated:</span> {sprint.updated}</h5>
                      {
                        sprint.endDate === "" ? <></>
                        : <h5><span>End date: </span>{handleEndDate(sprint.endDate)}</h5>
                      }
                    </div>
                  </div>
                );
              })
            }
          </>
        }
      </div>
      <SprintForm
        projectId={projectId}
        sprintFormRef={sprintFormRef}
        setRerender={setRerender}
        rerender={rerender}
      />
      {
        !searchSprint && !project.sprints
        ? <></>
        : 
          <EditSprintForm
            projectId={projectId}
            editSprintFormRef={editSprintFormRef}
            setRerender={setRerender}
            rerender={rerender}
            project={project}
            searchSprint={searchSprint}
          />
      }
      {
        isLoading ? <Loader />
        : 
          <div className='sprint-bug-table-wrapper'>
            {
              !project.bugs
              ? <div className='undefined'>
                  <h1>You've haven't entered any bugs</h1>
                </div>
              : 
                <SprintBugTable
                  setRerender={setRerender}
                  rerender={rerender}
                  project={project}
                  searchSprint={searchSprint}
                />
            }
          </div>
      }
    </StyledSprintSection>
  );
}

const StyledSprintSection = styled.div`
  height: 100%;
  max-height: 100vh;
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  padding: 2%;
  @media (max-width: 834px) {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 428px) {
    margin-left: 60px;
  }
  .undefined {
    background: white;
    width: 100%;
    min-height: 80vh;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  .button-wrapper {
    max-width: 70vw;
    display: flex;
    select,
    button {
      cursor: pointer;
      height: 30px;
      width: 150px;
      option {
        font-size: 20px;
      }
    }
  }
  .sprint-list-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 70vw;
    .title-wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 10vh;
      @media (max-width: 450px) {
        margin-top: 20px;
      }
      .title-container {
        display: flex;
        width: 600px;
        margin-right: auto;
        align-items: center;
        h4 {
          color: white;
          font-size: 30px;
          margin-top: auto;
          margin-right: 16px;
        }
        button {
          width: 30px;
          height: 30px;
          z-index: 3;
          background: none;
          border: none;
          @media (max-width: 450px) {
            margin-bottom: 0;
            width: 24px;
            height: 24px;
          }
          .tooltiptext {
            font-size: 16px;
            visibility: hidden;
            width: 150px;
            background-color: black;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 1000;
            top: 90%;
            left: 50%;
            @media (max-width: 450px) {
              left: 30%;
            }
          }
          #edit-button {
            width: 100%;
            height: 100%;
            cursor: pointer;
            transition: 0.2s;
            &:hover {
              transform: scale(1.05);
            }
          }
        }
        #edit-link:hover .tooltiptext,
        #edit-link:active .tooltiptext,
        #edit-link:focus .tooltiptext {
          visibility: visible;
          transition-delay: 1s;
        }
      }
      #status {
        width: 100%;
        color: white;
        @media (max-width: 450px) {
          margin-bottom: 6px;
        }
        span {
          color: ${pallette.helperGrey};
        }
      }
      .info-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        @media (max-width: 450px) {
          flex-direction: column;
        }
        h5 {
          color: white;
          @media (max-width: 450px) {
            margin-bottom: 6px;
          }
          span {
            color: ${pallette.helperGrey};
          }
        }
      }
    }
  }
  .sprint-bug-table-wrapper {
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
      display: none;
      width: none;
    }
  }
`;