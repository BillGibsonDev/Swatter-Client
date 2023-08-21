import { useEffect, useState, useRef } from "react";
import axios from "axios";

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

const ProjectPage = ({projectSideNavRef, user }) => {
  const commentSectionRef = useRef();

  const { projectId } = useParams();

  const [ project, setProject ] = useState([]);
  const [ rerender, setRerender ] = useState(false);
  const [ isLoading, setLoading ] = useState(true);
  const [ bugSearchPhrase, setBugSearchPhrase ] = useState('');

  useEffect(() => {
    const getProject = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}`, {
        headers: {
          Authorization: user.token,
        }
      })
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getProject(projectId);
  }, [ projectId, rerender, user ]);

  return (
    <StyledProjectPage>
      <ProjectSideNav
        project={project}
        projectSideNavRef={projectSideNavRef}
        commentSectionRef={commentSectionRef}
      />
      {
        isLoading ? <Loader />
        : <div className='bug-table-wrapper'>
            <Searchbar setSearchPhrase={setBugSearchPhrase} />
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
  max-height: 100vh;
  width: 100%;
  max-width: 80vw;
  display: flex;
  position: relative;
  margin-left: 350px;
  z-index: 2;
  @media (max-width: 1440px) {
    margin-left: 300px;
  }
  @media (max-width: 834px) {
    width: 900px;
    max-width: 85vw;
    margin-left: 70px;
  }
  @media (max-width: 820px) {
    width: 760px;
  }
  @media (max-width: 768px) {
    width: 710px;
  }
  @media (max-width: 428px) {
    width: 360px;
    margin-left: 60px;
  }
  @media (max-width: 414px) {
    width: 340px;
  }
  @media (max-width: 390px) {
    width: 320px;
  }
  @media (max-width: 375px) {
    width: 310px;
  }
  @media (max-width: 360px) {
    width: 295px;
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
  .bug-table-wrapper {
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    position: relative;
    width: 100vw;
    display: flex;
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

export default connect(mapStateToProps)(ProjectPage);