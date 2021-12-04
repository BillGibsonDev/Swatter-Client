import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import Project from '../components/Project.js';
import HomePageLoader from '../loaders/HomePageLoader';

// link
import { Link } from 'react-router-dom';


export default function HomePage({user, role, confirmRole}) {

    const [ projects, setProjects ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)

    useEffect(() =>{
        getProjects();
        // eslint-disable-next-line
    }, []);

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

    return (
        <StyledHomePage>
            {
                isLoading === true ? (
                    <HomePageLoader />
                ) : (
                    <>
                        <header>
                            <h1>What can we achieve today?</h1>
                            <Link to={'/AddProjectPage'}>New Project</Link>
                        </header>
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
                                            fontColor={project.fontColor}
                                            background={project.backgroundColor}
                                            key={key}
                                            user={user}
                                            role={role}
                                            confirmRole={confirmRole}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                )
            }
        </StyledHomePage>
    )
}

const StyledHomePage = styled.div`
background: #fff;
width: 90%;
margin: auto;
min-height: 80vh;
border-radius: 20px;
display: flex;
flex-direction: column;
    header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
        h1, a {
            font-size: 1.2em;
            margin: 1% auto;
            color: #0f4d92;
            span {
                color: black;
            }
        }
        a {
            background: #f3f3f3;
            padding: 0 6px;
            border-radius: 4px;
            font-weight: bold;
            &:hover{
                color: #ffffff;
                cursor: pointer;
                background: #0f4d92;
                transition: 0.2s;
                transform: scale(1.01);
            }
        }
    }
    .projects-container {
        width: 90%;
        margin: 1% auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 2%;
        grid-row-gap: 2%;
    }
`;
