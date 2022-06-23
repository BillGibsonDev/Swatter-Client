import React from 'react'

// styled 
import styled from 'styled-components'
import * as pallette from '../../../styled/ThemeVariables.js';

// images
import DefaultImage from '../../../assets/icons/cubeBlack.png';
import Repo from '../../../assets/icons/code.png';
import Globe from '../../../assets/icons/globe.png';
import Schedule from '../../../assets/icons/schedule.png';
import Settings from '../../../assets/icons/panel.png';
import AddBug from '../../../assets/icons/plus.png';
import Comments from '../../../assets/icons/comments.png';
import Sprints from '../../../assets/icons/sprint.png';

// router
import { Link } from 'react-router-dom';

export const ProjectSideNav = ({project, handleShowComments}) => {

  return (
    <StyledSideNav id="side-nav">
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
                <Link to={`/`}><img src={Schedule} alt="" />Schedule</Link>
                <Link to={`/`}><img src={Sprints} alt="" />Sprints</Link>
                <a href={project.repository} target="_blank" rel="noreferrer"><img src={Repo} alt="" />Repository</a>
                <a href={project.projectLink} target="_blank" rel="noreferrer"><img src={Globe} alt="" />Project Link</a>
                <h6 onClick={()=> { handleShowComments()}}><img src={Comments} alt="" />Comments</h6>
                <Link to={`/${project._id}/AddBugPage`}><img src={AddBug} alt="" />Add Bug</Link>
                <Link to={`/`}><img src={Settings} alt="" />Settings</Link>
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
        a, h6 {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px 10px 10px 20px;
            color: black;
            font-size: 16px;
            font-weight: 400;
            cursor: pointer;
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
`;