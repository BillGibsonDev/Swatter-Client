import { useState, useEffect } from 'react';

// styled 
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables.js';

// images
import * as icons from '../../../assets/IconImports.js';
import * as images from '../../../assets/ImageImports.js';

// router
import { Link, useParams } from 'react-router-dom';

// functions
import { toggleRef } from '../../../functions/toggleRef.js';

export const ProjectSideNav = ({ project, projectSideNavRef, commentSectionRef, ArchiveRef }) => {

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
                    !project.projectImage
                    ? <img id="default" src={images.DefaultImage} alt={project.projectTitle} />
                    : <img src={project.projectImage} alt={project.projectTitle} />
                }
                <h5>{project.projectTitle} 
                    <span>{project.projectType}</span>
                </h5>
            </div>
            <div className="menu-wrapper">
                                <a href={project.repository} target="_blank" rel="noreferrer"><img src={icons.Repo} alt="Repository" />Repository</a>
                <a href={project.projectLink} target="_blank" rel="noreferrer"><img src={icons.Globe} alt="Website" />Website</a>
                <button onClick={()=> { toggleRef(commentSectionRef)}}><img src={icons.Comments} alt="Comments" />Comments</button>
                <Link to={`/project/${projectId}/sprints`}><img src={icons.Sprints} alt="Sprints" />Sprints</Link>
                <Link to={`/${projectId}/CreateBugPage`}><img src={icons.AddBug} alt="Create Bug" />Create Bug</Link>
                <Link to={`/${projectId}/details`}><img src={icons.Details} alt="Details" />Details</Link>
                <Link to={`/${projectId}/archive`}><img src={icons.ArchiveIcon} alt="Archive" />Archive</Link>
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
            background: ${palette.helperGrey};
        }
        h5 {
            display: flex;
            flex-direction: column;
            margin-left: 12px;
            font-size: .8em;
            span {
                font-size: .8em;
                color: #666666;
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
            font-size: .8em;
            font-weight: 400;
            cursor: pointer;
            background: none;
            border: none;
            width: 100%;
            white-space: nowrap;
            img {
                width: 25px;
                height: 25px;
                margin-right: 10px;
            }
            &:hover {
                background: ${palette.accentColorTransparent};
                color: white;
            }
        }
    }
    @keyframes slideLeftSideNav {
        from {width: 0; opacity: 0; left: -300px; white-space: nowrap;}
        to {width: 250px; opacity: 1; left: 50px; }
    }
    @keyframes slideLeftSideNav1440 {
        from {width: 0; opacity: 0; left: -300px; white-space: nowrap;}
        to {width: 225px; opacity: 1; left: 50px; }
    }
    @keyframes slideLeftSideNav810 {
        from {width: 0; opacity: 0; left: -300px; white-space: nowrap;}
        to {width: 300px; opacity: 1; left: 50px; }
    }
    @keyframes slideLeftSideNav390 {
        from {width: 0; opacity: 0; left: -300px; white-space: nowrap;}
        to {width: 100%; opacity: 1; left: 50px; }
    }
`;