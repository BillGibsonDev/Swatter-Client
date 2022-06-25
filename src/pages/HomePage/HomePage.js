import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../styled/ThemeVariables';

// components
import Project from './components/Project.js';
import HomePageLoader from '../../loaders/HomePageLoader';

// router
import { Link } from 'react-router-dom';

// images
import Add from '../../assets/icons/Add.png';

export default function HomePage({user, role, confirmRole}) {

    const [ projects, setProjects ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)

    useEffect(() =>{
        function getProjects(){
            axios.get(`${process.env.REACT_APP_GET_PROJECTS_URL}`)
            .then(function (response){
                setProjects(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                throw error;
            });
        }
        getProjects();
    }, []);

    return (
        <StyledHomePage>
            {
                isLoading === true 
                ? <HomePageLoader />
                : <>
                    <div className="projects-container">
                        {
                            projects.slice().reverse().map((project, key) => {
                                return (
                                    <Project
                                        projects={projects}
                                        projectId={project._id}
                                        title={project.projectTitle}
                                        date={project.startDate}
                                        author={project.author}
                                        projectImage={project.projectImage}
                                        key={key}
                                        user={user}
                                        role={role}
                                        confirmRole={confirmRole}
                                    />
                                )
                            })
                        }
                        <Link id="add-button" to={'/AddProjectPage'}>Add Project<img src={Add} alt=""/></Link>
                    </div>
                </>
            }
        </StyledHomePage>
    )
}

const StyledHomePage = styled.div`
    width: 90%;
    max-width: 1000px;
    margin: auto;
    margin-top: 2%;
    min-height: 80vh;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    .projects-container {
        width: 100%;
        margin: 1% auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 2%;
        row-gap: 2em;
        @media (max-width: 1050px){
            grid-template-columns: 1fr 1fr;
            margin-left: 30px;
        }
        @media (max-width: 450px){
            grid-template-columns: 75vw;
            row-gap: 20px;
            margin-left: 50px;
        }
        #add-button {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            height: 300px;
            margin: 10px auto;
            position: relative;
            background: ${pallette.accentColor};
            color: white;
            border-radius: 4px;
            font-weight: 700;
            font-size: ${pallette.subtitleSize};
            img {
                margin-top: 10px;
                width: 50px;
            }
            &:hover{
                transition: 0.2s;
                transform: scale(1.01);
                background:#000000;
            }
        }
    }
`;
