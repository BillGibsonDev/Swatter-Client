import { useEffect, useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// components
import BugTable from "./components/BugTable.js";
import { ProjectSideNav } from "./components/ProjectSideNav";
import { Searchbar } from "./forms/Searchbar";

// loaders
import Loader from "../../loaders/Loader";

// pop out sections
import CommentSection from "./sections/CommentSection";

// images
import arrowRight from "../../assets/icons/arrowRight.png";

// router
import { useParams } from "react-router-dom";

export const ProjectPage = () => {
  const commentSectionRef = useRef();
  const projectSideNavRef = useRef();

  const { projectId, bugId } = useParams();

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
    const getProject = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setProject(response.data);
        setBugs(response.data.bugs);
        setOpenBugs(response.data.bugs.filter((bugs) => bugs.status === "Open"));
        setUnderwayBugs(response.data.bugs.filter((bugs) => bugs.status === "Underway"));
        setReviewBugs(response.data.bugs.filter((bugs) => bugs.status === "Reviewing"));
        setCompletedBugs( response.data.bugs.filter((bugs) => bugs.status === "Completed"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getProject(projectId);
  }, [projectId, bugId, rerender]);

  const toggleComments = () => {
    setRerender(!rerender);
    let section = commentSectionRef.current;
    if (section.style.display === "none") {
      section.style.display = "flex";
    } else {
      section.style.display = "none";
    }
  };

  const toggleSideNav = () => {
    setRerender(!rerender);
    let section = projectSideNavRef.current;
    if (section.style.display === "none") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  };

  const handleArrow = () => {
    let element = document.getElementById("arrow");
    element.classList.toggle("rotate");
  };

  return (
    <StyledProjectPage>
      <button id='arrow-button' onClick={() => { handleArrow(); toggleSideNav(); }}>
        <img id='arrow' src={arrowRight} alt='Project Menu' />
        <span className='tooltiptext'>Project Menu</span>
      </button>
      <ProjectSideNav
        project={project}
        projectSideNavRef={projectSideNavRef}
        toggleComments={toggleComments}
      />
      {
        isLoading ? <Loader />
        : <div className='bug-table-wrapper'>
            <Searchbar />
          {
            !bugs ? 
              <div className='undefined'>
                <h1>You've haven't entered any bugs</h1>
              </div>
            : 
            <>
              <BugTable
                setRerender={setRerender}
                rerender={rerender}
                bugs={bugs}
                openBugs={openBugs}
                underwayBugs={underwayBugs}
                reviewBugs={reviewBugs}
                completedBugs={completedBugs}
                projectId={projectId}
                project={project}
              />
            </>
          }
        </div>
      }
      <CommentSection
        toggleComments={toggleComments}
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
  #arrow-button {
    background: none;
    border: none;
    cursor: pointer;
    display: none;
    position: absolute;
    z-index: 2;
    top: 50%;
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
      top: 0;
      left: 105%;
    }
    @media (max-width: 834px) {
      display: block;
      left: -60px;
    }
    @media (max-width: 428px) {
      left: -45px;
    }
    img {
      transition: 0.2s;
      width: 30px;
      height: 30px;
    }
  }
  #arrow-button:hover .tooltiptext,
  #arrow-button:active .tooltiptext {
    visibility: visible;
    transition-delay: 1s;
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
  .rotate {
    transform: rotate(180deg);
    transition: 0.2s;
  }
`;