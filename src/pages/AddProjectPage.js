import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// router
import { Link } from 'react-router-dom';

// components
import Loader from '../loaders/Loader';

export default function AddProjectPage({user, role, confirmRole}) {

    const [ projectTitle, setProjectTitle] = useState("");
    const [ startDate, setStartDate] = useState("");
    const [ author, setAuthor ] = useState(user);
    const [ projectLink, setProjectLink ] = useState("");
    const [ projectImage, setProjectImage ] = useState("");
    const [ isLoading, setLoading ] = useState(false);
    const [ projectKey, setProjectKey ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ repository, setRepository ] = useState("");
    const [ projectLead, setProjectLead ] = useState("");
    const [ projectType, setProjectType ] = useState("");

    useEffect(() => {
        function handleDate(){
            const current = new Date();
            const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
            setStartDate(date);
        }
        handleDate();
        setAuthor(user);
    }, [user]);

    function addProject() {
        confirmRole(role);
        setLoading(true);
        axios.post(`${process.env.REACT_APP_ADD_PROJECT_URL}`, {
            projectTitle: projectTitle,
            startDate: startDate,
            author: author,
            projectLink: projectLink,
            projectImage: projectImage,
            repository: repository,
            description: description,
            projectKey: projectKey,
            projectLead: projectLead,
            projectType: projectType
        })
        .then(function(response) {
            if(response.data !== "Project Created"){
                setLoading(false);
                alert("Server Error - Project not created")
            } else {
                setLoading(false);
                alert('Project Started!');
            }
        })
        .catch(function(response){
            console.log(response);
        })
    }

    function unauthorized() {
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledProjectPage>
            <h1>Start a Project</h1>
            {
                user === null ? (
                    <h1>You are signed out</h1>
                ) :isLoading === true ? (    
                    <Loader/>
                ) : (
                <div className="form-wrapper">
                    <label>Title
                        <input 
                            type="text"
                            id="title"
                            onChange={(event) => {
                                setProjectTitle(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Key
                        <input 
                            type="text"
                            id="key"
                            onChange={(event) => {
                                setProjectKey(event.target.value);
                            }} 
                        />
                    </label>
                    <label>URL
                        <input 
                            type="text"
                            id="projectLink"
                            onChange={(event) => {
                                setProjectLink(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Repository
                        <input 
                            type="text"
                            id="repositiory"
                            onChange={(event) => {
                                setRepository(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Lead
                        <input 
                            type="text" 
                            id="projectLead"
                            onChange={(event) => {
                                setProjectLead(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Date
                        <input 
                            type="text" 
                            id="date"
                            onChange={(event) => {
                                setStartDate(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Project Type
                        <input 
                            type="text" 
                            id="projectType"
                            onChange={(event) => {
                                setProjectType(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Description
                        <input 
                            type="text" 
                            id="description"
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Image
                        <input 
                            type="text" 
                            id="image"
                            onChange={(event) => {
                                setProjectImage(event.target.value);
                            }} 
                        />
                    </label>
                    <div className="button-container">
                        {
                            role === process.env.REACT_APP_GUEST_SECRET 
                            ? <button onClick={unauthorized}>Start</button>
                            : <button onClick={addProject}>Start</button>
                        }
                        <Link to={`/`}>Back</Link>
                    </div>
                </div>
            )}
        </StyledProjectPage>
    ) 
}

const StyledProjectPage = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 50vh;
    width: 100%;
    max-width: 1000px;
    margin: 50px auto;
    @media (max-width: 750px){
        height: 40vh;
        margin: 20px auto;
    }
    @media (max-width: 428px){
        margin-left: 65px;
        width: 80vw;
    }
    h1 {
        color: white;
        width: 95%;
        margin: 2% auto;
        font-size: ${pallette.titleSize};
        @media (max-width: 750px){
            font-size: ${pallette.subtitleSize};
        }
    }
    .form-wrapper {
        width: 95%;
        margin: 2% auto;
        label {
            display: flex;
            flex-direction: column;
            margin: 20px 0;
            color: white;
            font-size: ${pallette.subtitleSize};
            @media (max-width: 750px){
                font-size: ${pallette.paraSize};
            }
            @media (max-width: 428px){
                font-size: 16px;
                margin: 10px 0;
            }
            input, select {
                width: 50%;
                height: 40px;
                font-size: 18px;
                padding: 2px;
                background: ${pallette.helperGrey};
                @media (max-width: 750px){
                    width: 100%;
                }
                @media (max-width: 428px){
                    font-size: 16px;
                    height: 30px;
                }
            }
        }
        .button-container{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 50%;
            @media (max-width: 750px){
                margin-top: 10%;
            }
            @media (max-width: 750px){
                width: 100%;
            }
            button, a {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 150px;
                height: 40px;
                cursor: pointer;
                border: none;
                border-radius: 4px;
                font-size: ${pallette.subtitleSize};
                font-weight: 700;
                background: #ffffff;
                color: ${pallette.accentColor};
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #000000;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
                @media (max-width: 750px){
                    width: 100px;
                    font-size: ${pallette.paraSize};
                }
                @media (max-width: 429px){
                    width: 100px;
                    font-size: 16px;
                }
            }
        }
    }
`;