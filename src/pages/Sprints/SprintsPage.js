import { useState, useEffect } from "react";

// styled
import styled from "styled-components";
import * as palette from "../../styled/ThemeVariables";
import { StyledButton } from "../../styled/StyledButton";

// components
import SprintTicketTable from "./components/SprintTicketTable.js";
import BreadCrumbs from "../../components/Breadcrumbs";
import { TitleContainer } from "./components/TitleContainer";
import CreateSprint from "./sections/CreateSprint";
import EditSprint from "./sections/EditSprint";

// loaders
import Loader from "../../loaders/Loader";

// router
import { useParams } from "react-router-dom";

// functions
import { getProject } from "../../functions/getProject";

// redux
import { connect } from "react-redux";

const SprintsPage = ({ user }) => {
  const { projectId } = useParams();

  const [searchSprint, setSearchSprint] = useState(false);
  const [options, setOptions] = useState([]);
  const [project, setProject] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [ editing, setEditing ] = useState(false);
  const [ creating, setCreating ] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject( user, projectId );
        setProject(projectData);
        setOptions(projectData.sprints);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProject();
  }, [ projectId, user, editing, creating ]);

  return (
    <StyledPage>
      <BreadCrumbs 
        projectId={projectId}
        projectTitle={project.title} 
        title={'Sprints'}
      />
      {
        isLoading ? <Loader />
        : creating ? <CreateSprint
          setCreating={setCreating}
          projectId={projectId}
        />
        : editing ? <EditSprint
          projectId={projectId}
          rerender={rerender}
          setRerender={setRerender}
          project={project}
          searchSprint={searchSprint}
          setEditing={setEditing}
          setSearchSprint={setSearchSprint}
          setOptions={setOptions}
        />
        : 
          <div className='sprint-ticket-table-wrapper'>
            {
              !project.tickets
              ? <div className='undefined'>
                  <h1>You've haven't entered any tickets</h1>
                </div>
              : 
              <>
              <div className='button-wrapper'>
              <StyledButton onClick={() => { setCreating(true); }}>New Sprint</StyledButton>
              {
                !options
                ? <></>
                : 
                  <select onChange={(e) => { setSearchSprint(e.target.value); setRerender(!rerender);}}>
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
                            <TitleContainer
                              key={key}
                              sprint={sprint}
                              setEditing={setEditing}
                            />
                          );
                        })
                      }
                    </>
                  }
                </div>
                <SprintTicketTable
                  setRerender={setRerender}
                  rerender={rerender}
                  project={project}
                  searchSprint={searchSprint}
                />
              </>
            }
          </div>
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  max-height: 80vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  overflow: hidden;
  position: relative;
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
    display: flex;
    width: auto;
    button {
      margin: 0 4px;
      height: 30px;
    }
    select {
      margin: 0;
      cursor: pointer;
      height: 30px;
      width: 200px;
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
      }
      #status {
        width: 100%;
        color: white;
        @media (max-width: 450px) {
          margin-bottom: 6px;
        }
        span {
          color: ${palette.helperGrey};
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
            color: ${palette.helperGrey};
          }
        }
      }
    }
  }
  .sprint-ticket-table-wrapper {
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SprintsPage);