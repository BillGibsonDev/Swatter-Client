import { useEffect, useState, useRef } from "react";

// styled
import styled from "styled-components";

// components
import BugTable from "./components/BugTable.js";
import { ProjectSideNav } from "./components/ProjectSideNav";
import { Searchbar } from "../../components/Searchbar";
import SearchBugTable from "./components/SearchBugTable.js";

// loaders
import Loader from "../../loaders/Loader";

// pop out sections
import CommentSection from "./sections/CommentSection";

// router
import { useParams } from "react-router-dom";

// redux
import { connect } from "react-redux";

// functions
import { getProject } from "../../functions/getProject.js";

const ProjectPage = ({projectSideNavRef, user }) => {
  const commentSectionRef = useRef();

  const { projectId } = useParams();

  const [ project, setProject ] = useState([]);
  const [ rerender, setRerender ] = useState(false);
  const [ isLoading, setLoading ] = useState(true);
  const [ bugSearchPhrase, setBugSearchPhrase ] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject( user, projectId );
        setProject(projectData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId, user]);

  return (
    <StyledProjectPage>
      <ProjectSideNav
        user={user}
        project={project}
        projectSideNavRef={projectSideNavRef}
        commentSectionRef={commentSectionRef}
      />
      <Searchbar setSearchPhrase={setBugSearchPhrase} />
      {
        isLoading ? <Loader />
        : <div className='bug-table-wrapper'>
          {
            !project.bugs ? 
              <div className='undefined'>
                <h1>You've haven't entered any bugs</h1>
              </div>
            : bugSearchPhrase ?
              <SearchBugTable
                project={project}
                bugs={project.bugs}
                bugSearchPhrase={bugSearchPhrase}
              />
            :
              <BugTable
                setRerender={setRerender}
                rerender={rerender}
                project={project}
                bugs={project.bugs}
                bugSearchPhrase={bugSearchPhrase}
              />
          }
        </div>
      }
      <CommentSection
        commentSectionRef={commentSectionRef}
        setRerender={setRerender}
        rerender={rerender}
      />
    </StyledProjectPage>
  );
}

const StyledProjectPage = styled.div`
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
  .bug-table-wrapper {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProjectPage);