import { useState, useEffect } from 'react';

// styled 
import styled from 'styled-components'
import * as pallette from '../../../styled/ThemeVariables.js';

// images
import DefaultImage from '../../../assets/icons/cubeBlack.png';
import Repo from '../../../assets/icons/code.png';
import Globe from '../../../assets/icons/globe.png';
import Details from '../../../assets/icons/panel.png';
import AddBug from '../../../assets/icons/plus.png';
import Comments from '../../../assets/icons/comments.png';
import Sprints from '../../../assets/icons/sprint.png';

export const ProjectSideNav = ({
    project, 
    toggleComments, 
    toggleAddBugs,
    toggleSprints, 
    projectSideNavRef,
    toggleDetails
}) => {

    const [ screenWidth, setScreenWidth ] = useState(0)

    useEffect(() => {
      const handleScreenWidth = () => {
        setScreenWidth(window.innerWidth)
      }
      handleScreenWidth();
    }, [])

  return (
    <StyledSideNav ref={projectSideNavRef} style={{display: screenWidth > 834 ? "block" : "none"}}>
        <div className="sidenav-wrapper">
            <div className="title-container">
                {
                    project.projectImage === "" 
                    ? <img id="default" src={DefaultImage} alt="" />
                    : <img src={project.projectImage} alt="" />
                }
                <h5>{project.projectTitle} 
                    <span>{project.projectType}</span>
                </h5>
            </div>
            <div className="menu-wrapper">
                <button onClick={() => { toggleSprints()}} ><img src={Sprints} alt="" />Sprints</button>
                <a href={project.repository} target="_blank" rel="noreferrer"><img src={Repo} alt="" />Repository</a>
                <a href={project.projectLink} target="_blank" rel="noreferrer"><img src={Globe} alt="" />Project Link</a>
                <button onClick={()=> { toggleComments()}}><img src={Comments} alt="" />Comments</button>
                <button onClick={()=> { toggleAddBugs()}}><img src={AddBug} alt="" />Add Bug</button>
                <button onClick={()=> { toggleDetails()}}><img src={Details} alt="" />Details</button>
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