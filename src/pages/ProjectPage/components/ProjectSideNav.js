import { useState, useEffect } from 'react';

// styled 
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables.js';

// images
import * as icons from '../../../assets/IconImports.js';
import * as images from '../../../assets/ImageImports.js';

// router
import { Link, useParams } from 'react-router-dom';

export const ProjectSideNav = ({
    project, 
    toggleComments,
    projectSideNavRef
}) => {

    const { projectId } = useParams();

    const [ screenWidth, setScreenWidth ] = useState(0);

    useEffect(() => {
      const handleScreenWidth = () => {
        setScreenWidth(window.innerWidth);
      }
      handleScreenWidth();
    }, [])

  return (
    <StyledSideNav ref={projectSideNavRef} style={{display: screenWidth > 834 ? "block" : "none"}}>
        <div className="sidenav-wrapper">
            <div className="title-container">
                {
                    project.projectImage === "" 
                    ? <img id="default" src={images.DefaultImage} alt={project.projectTitle} />
                    : <img src={project.projectImage} alt={project.projectTitle} />
                }
                <h5>{project.projectTitle} 
                    <span>{project.projectType}</span>
                </h5>
            </div>
            <div className="menu-wrapper">
                <Link to={`/projects/${projectId}/sprints`} ><img src={icons.Sprints} alt="Sprints" />Sprints</Link>
                <a href={project.repository} target="_blank" rel="noreferrer"><img src={icons.Repo} alt="Repository" />Repository</a>
                <a href={project.projectLink} target="_blank" rel="noreferrer"><img src={icons.Globe} alt="Website" />Project Link</a>
                <button onClick={()=> { toggleComments()}}><img src={icons.Comments} alt="Comments" />Comments</button>
                <Link to={`/${projectId}/CreateBugPage`} ><img src={icons.AddBug} alt="Create Bug" />Create Bug</Link>
                <Link to={`/${projectId}/details`} ><img src={icons.Details} alt="Details" />Details</Link>
            </div>
        </div>
    </StyledSideNav>
  )
}

const StyledSideNav = styled.div`
    width: 250px;
    background: white;
    height: 100%;
    left: 60px;
    position: fixed;
    z-index: 2;
    max-height: 100vh;
    animation-name: slideLeftSideNav;
    animation-duration: .5s;
    @media (max-width: 1440px){
        width: 225px;
        animation-name: slideLeftSideNav1440;
    }
    @media (max-width: 834px){
        animation-name: slideLeftSide810;
        width: 300px;
    }
    @media (max-width: 428px){
        width: 100%;
        left: 50px;
        animation-name: slideLeftSideNav390;
        animation-duration: .5s;
    }
    .sidenav-wrapper {
        margin: 16px;
    }
    .title-container {
        display: flex;
        img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background: ${pallette.helperGrey};
        }
        h5 {
            display: flex;
            flex-direction: column;
            margin-left: 12px;
            font-size: 16px;
            span {
                font-size: 14px;
                color: grey;
            }
        }
    }
    .menu-wrapper {
        margin-top: 20px;
        a, button {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px 10px 10px 20px;
            color: black;
            font-size: 16px;
            font-weight: 400;
            cursor: pointer;
            background: none;
            border: none;
            width: 100%;
            img {
                width: 25px;
                height: 25px;
                margin-right: 10px;
            }
            &:hover {
                background: ${pallette.accentColorTransparent};
                color: white;
            }
        }
    }
    @keyframes slideLeftSideNav {
        from {width: 0; opacity: 0; left: -300px;}
        to {width: 250px; opacity: 1; left: 50px; }
    }
    @keyframes slideLeftSideNav1440 {
        from {width: 0; opacity: 0; left: -300px;}
        to {width: 225px; opacity: 1; left: 50px; }
    }
    @keyframes slideLeftSideNav810 {
        from {width: 0; opacity: 0; left: -300px;}
        to {width: 300px; opacity: 1; left: 50px; }
    }
    @keyframes slideLeftSideNav390 {
        from {width: 0; opacity: 0; left: -300px;}
        to {width: 100%; opacity: 1; left: 50px; }
    }
    
`;