import { useEffect, useState } from 'react';

// styled 
import styled from 'styled-components';
import * as palette from '../styled/ThemeVariables.js';

// images
import * as icons from '../assets/IconImports.js';
import * as images from '../assets/ImageImports.js';

// router
import { Link, useLocation, useNavigate } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

// functions
import { getProject } from '../functions/getProject.js';
import { toggleProjectSideNav } from "../functions/toggleProjectNav";

const ProjectSideNav = ({ user, projectSideNavRef }) => {

    const [ project, setProject ] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLocation = () => {
            let urlCheck = location.pathname.includes('/projects/');
            let section = projectSideNavRef.current;
            let x = section.style.display === 'block';
            if(!urlCheck && x){ section.style.display = 'none'}
            return urlCheck;
        }
        const fetchProject = async (projectId) => {
            try {
                const projectData = await getProject(user, projectId);
                setProject(projectData);
            } catch (error) {
                console.log(error);
            }
        };

        if(handleLocation()){
            const x = location.pathname.split('/');
            if(x[3]){
                fetchProject(x[3].toString());
            }
        }
    }, [ user, location, projectSideNavRef ]);

  return (
    <StyledSideNav ref={projectSideNavRef} style={{display: 'none' }}>
        <div className="sidenav-wrapper">
            <div className="title-container" onClick={() => { navigate(`/${user.id}/projects/${project._id}`)}}>
                {
                    !project.image
                    ? <img id="default" src={images.DefaultImage} alt={project.title} />
                    : <img src={project.image} alt={project.title} />
                }
                <h5>{project.title}</h5>
            </div>
            <div className="menu-wrapper">
                { 
                    project.repository ? <a href={project.repository} target="_blank" rel="noreferrer"><img src={icons.Repo} alt="Repository" />Repository</a>
                    : <></> 
                }
                { 
                    project.link ? <a href={project.link} target="_blank" rel="noreferrer"><img src={icons.Globe} alt="Website" />Website</a> 
                    : <></> 
                }
                <Link to={`/${user.id}/projects/${project._id}/comments`} onClick={() => toggleProjectSideNav(projectSideNavRef)}><img src={icons.Comments} alt="Comments" />Comments</Link>
                <Link to={`/${user.id}/projects/${project._id}/sprints`} onClick={() => toggleProjectSideNav(projectSideNavRef)}><img src={icons.Sprints} alt="Sprints" />Sprints</Link>
                <Link to={`/${user.id}/projects/${project._id}/create-bug`} onClick={() => toggleProjectSideNav(projectSideNavRef)}><img src={icons.AddBug} alt="Create Bug" />Create Bug</Link>
                <Link to={`/${user.id}/projects/${project._id}/details`} onClick={() => toggleProjectSideNav(projectSideNavRef)}><img src={icons.Details} alt="Details" />Details</Link>
                <Link to={`/${user.id}/projects/${project._id}/archive`} onClick={() => toggleProjectSideNav(projectSideNavRef)}><img src={icons.ArchiveIcon} alt="Archive" />Archive</Link>
                <Link to={`/${user.id}/projects/${project._id}/activity`} onClick={() => toggleProjectSideNav(projectSideNavRef)}><img src={icons.ActivityIcon} alt="Activity" />Activity</Link>
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
    left: 35px;
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
        align-items: center;
        cursor: pointer;
        transition: 0.2s;
        border-radius: 4px;
        img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background: ${palette.helperGrey};
            margin: 2px;
        }
        h5 {
            display: flex;
            flex-direction: column;
            margin-left: 8px;
            font-size: 1em;
            word-wrap: break-word;
        }
        &:hover {
            background: ${palette.accentColorTransparent};
            color: white;
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
        to {width: 250px; opacity: 1; left: 35px; }
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ProjectSideNav);