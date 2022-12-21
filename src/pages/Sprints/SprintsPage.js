import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../../styled/ThemeVariables";

// components
import SprintBugTable from "./components/SprintBugTable.js";

// forms
import { SprintForm } from "./forms/SprintForm.js";
import { EditSprintForm } from "./forms/EditSprintForm.js";

// images
import Edit from "../../assets/icons/editIconWhite.png";

// loaders
import Loader from "../../loaders/Loader";

// router
import { useParams } from "react-router-dom";

export default function SprintsPage({ user, role, confirmRole }) {
  const { projectId } = useParams();

  const sprintForm = useRef();
  const editSprintForm = useRef();

  const [searchSprint, setSearchSprint] = useState(false);
  const [options, setOptions] = useState([]);

  const [bugs, setBugs] = useState([]);
  const [project, setProject] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // data states
  const [openBugs, setOpenBugs] = useState([]);
  const [underwayBugs, setUnderwayBugs] = useState([]);
  const [reviewBugs, setReviewBugs] = useState([]);
  const [completedBugs, setCompletedBugs] = useState([]);

  useEffect(() => {
    const getProject = (projectId) => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`
        )
        .then(function (response) {
          setProject(response.data);
          setBugs(response.data.bugs);
          setOpenBugs(
            response.data.bugs.filter((bugs) => bugs.status === "Open")
          );
          setUnderwayBugs(
            response.data.bugs.filter((bugs) => bugs.status === "Underway")
          );
          setReviewBugs(
            response.data.bugs.filter((bugs) => bugs.status === "Reviewing")
          );
          setCompletedBugs(
            response.data.bugs.filter((bugs) => bugs.status === "Completed")
          );
          setOptions(response.data.sprints);
          handleEndDate(response.data.sprints[0].endDate);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getProject(projectId);
  }, [projectId, rerender]);

  const toggleSprintForm = () => {
    let section = sprintForm.current;
    if (section.style.display === "none") {
      section.style.display = "flex";
    } else {
      section.style.display = "none";
    }
  };

  const toggleEditSprintForm = () => {
    let section = editSprintForm.current;
    if (section.style.display === "none") {
      section.style.display = "flex";
    } else {
      section.style.display = "none";
    }
  };

  const handleEndDate = (x) => {
    let newArr = x.split(/[ -]+/);
    return `${newArr[1]}/${newArr[2]}/${newArr[0]}`;
  };

  return (
    <StyledSprintSection>
      <div className='button-wrapper'>
        <button
          onClick={() => {
            toggleSprintForm();
          }}
        >
          New Sprint
        </button>
        {options === undefined ? (
          <></>
        ) : (
          <select
            onChange={(event) => {
              setSearchSprint(event.target.value);
              setRerender(!rerender);
            }}
          >
            <option value=''></option>
            {options.map((sprint, key) => {
              return (
                <option key={key} id={sprint._id} value={`${sprint.title}`}>
                  {sprint.title}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div className='sprint-list-wrapper'>
        {project.sprints === undefined ? (
          <></>
        ) : (
          <>
            {project.sprints
              .filter((sprint) => sprint.title === searchSprint)
              .map((sprint, key) => {
                return (
                  <div className='title-wrapper' key={key}>
                    <div className='title-container'>
                      <h4>{sprint.title}</h4>
                      <button
                        onClick={() => {
                          toggleEditSprintForm();
                        }}
                      >
                        <img id='edit-button' src={Edit} alt='' />
                        <span className='tooltiptext'>Edit Sprint</span>
                      </button>
                    </div>
                    <h5 id='status'>
                      <span>Status: </span>
                      {sprint.status}
                    </h5>
                    <div className='info-container'>
                      <h5>
                        <span>Updated:</span> {sprint.updated}
                      </h5>
                      {sprint.endDate === "" ? (
                        <></>
                      ) : (
                        <h5>
                          <span>End date: </span>
                          {handleEndDate(sprint.endDate)}
                        </h5>
                      )}
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
      <SprintForm
        projectId={projectId}
        toggleSprintForm={toggleSprintForm}
        sprintForm={sprintForm}
        setRerender={setRerender}
        rerender={rerender}
        confirmRole={confirmRole}
        role={role}
      />
      {searchSprint === undefined && project.sprints === undefined ? (
        <></>
      ) : (
        <EditSprintForm
          projectId={projectId}
          toggleEditSprintForm={toggleEditSprintForm}
          editSprintForm={editSprintForm}
          setRerender={setRerender}
          rerender={rerender}
          project={project}
          searchSprint={searchSprint}
          confirmRole={confirmRole}
          role={role}
        />
      )}
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className='sprint-bug-table-wrapper'>
          {bugs === undefined ? (
            <div className='undefined'>
              <h1>You've havent entered any bugs</h1>
            </div>
          ) : (
            <>
              <SprintBugTable
                setRerender={setRerender}
                rerender={rerender}
                user={user}
                bugs={bugs}
                openBugs={openBugs.filter(
                  (openBugs) => openBugs.sprint === searchSprint
                )}
                underwayBugs={underwayBugs.filter(
                  (underwayBugs) => underwayBugs.sprint === searchSprint
                )}
                reviewBugs={reviewBugs.filter(
                  (reviewBugs) => reviewBugs.sprint === searchSprint
                )}
                completedBugs={completedBugs.filter(
                  (completedBugs) => completedBugs.sprint === searchSprint
                )}
                projectId={projectId}
                project={project}
                searchSprint={searchSprint}
              />
            </>
          )}
        </div>
      )}
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
