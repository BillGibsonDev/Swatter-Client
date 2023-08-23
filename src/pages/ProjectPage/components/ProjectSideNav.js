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

export const ProjectSideNav = ({ user, project, projectSideNavRef, commentSectionRef }) => {

    const { projectId } = useParams();

  return (
    <StyledSideNav ref={projectSideNavRef} style={{display: 'none'}}>
        <div className="sidenav-wrapper">
            <div className="title-container">
                {
                    !project.image
                    ? <img id="default" src={images.DefaultImage} alt={project.title} />
                    : <img src={project.image} alt={project.title} />
                }
                <h5>{project.title} 
                    <span>{project.type}</span>
                </h5>
            </div>
            <div className="menu-wrapper">
                <a href={project.repository} target="_blank" rel="noreferrer"><img src={icons.Repo} alt="Repository" />Repository</a>
                <a href={project.link} target="_blank" rel="noreferrer"><img src={icons.Globe} alt="Website" />Website</a>
                <button onClick={()=> { toggleRef(commentSectionRef)}}><img src={icons.Comments} alt="Comments" />Comments</button>
                <Link to={`/${user.id}/projects/${projectId}/sprints`}><img src={icons.Sprints} alt="Sprints" />Sprints</Link>
                <Link to={`/${user.id}/projects/${projectId}/create-bug`}><img src={icons.AddBug} alt="Create Bug" />Create Bug</Link>
                <Link to={`/${user.id}/projects/${projectId}/details`}><img src={icons.Details} alt="Details" />Details</Link>
                <Link to={`/${user.id}/projects/${projectId}/archive`}><img src={icons.ArchiveIcon} alt="Archive" />Archive</Link>
                <Link to={`/${user.id}/projects/${projectId}/activity`}><img src={icons.ActivityIcon} alt="Activity" />Activity</Link>
            </div>
        </div>
    </StyledSideNav>
  )
}

const StyledSideNav = styled.div`
    width: 100%;
    max-width: 250px;
    background: white;
    height: 100%;
    position: fixed;
    top: 0;
    left: 60px;
    z-index: 2;
    max-height: 100vh;
    animation-name: slideLeftSideNav;
    animation-duration: .5s;
    transition: 0.2s;
    .sidenav-wrapper {
        margin: 1em;
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
        to {width: 250px; opacity: 1; left: 60px; }
    }
`;